import { useQueryClient } from "@tanstack/react-query";
import { type ReactNode, useEffect } from "react";
import { io } from "socket.io-client";

import { myNotificationsQueryKey } from "../hooks/use-notifications";
import { getSocketServerUrl } from "../lib/api";
import type { Notification } from "../types/database";
import { useAuth } from "./auth-context";

function upsertNotification(
  currentNotifications: Notification[] | undefined,
  incomingNotification: Notification,
) {
  const notifications = currentNotifications ?? [];
  const deduped = notifications.filter((notification) => notification.id !== incomingNotification.id);

  return [incomingNotification, ...deduped].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );
}

export function NotificationRealtimeProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (loading || !isAuthenticated) {
      return;
    }

    const socketServerUrl = getSocketServerUrl();

    if (!socketServerUrl) {
      return;
    }

    const socket = io(socketServerUrl, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });

    socket.on("connect", () => {
      void queryClient.invalidateQueries({ queryKey: myNotificationsQueryKey });
    });

    socket.on("notification:new", (notification: Notification) => {
      queryClient.setQueryData<Notification[]>(myNotificationsQueryKey, (currentNotifications) =>
        upsertNotification(currentNotifications, notification),
      );
    });

    socket.on("notification:read", ({ notificationId }: { notificationId: string }) => {
      const readAt = new Date().toISOString();

      queryClient.setQueryData<Notification[]>(myNotificationsQueryKey, (currentNotifications) =>
        (currentNotifications ?? []).map((notification) =>
          notification.id === notificationId ? { ...notification, readAt } : notification,
        ),
      );
    });

    socket.on("notification:read-all", () => {
      const readAt = new Date().toISOString();

      queryClient.setQueryData<Notification[]>(myNotificationsQueryKey, (currentNotifications) =>
        (currentNotifications ?? []).map((notification) => ({
          ...notification,
          readAt: notification.readAt ?? readAt,
        })),
      );
    });

    socket.on("disconnect", () => {
      void queryClient.invalidateQueries({ queryKey: myNotificationsQueryKey });
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, loading, queryClient]);

  return children;
}
