import {
  NotificationManager,
  Notification,
  INotificationManager
} from "../../src/ts/services/notifications";

//------------------------------------------------------------------------------
// Setup and helpers
//------------------------------------------------------------------------------

function makeNotification(notif: Partial<Notification> = {}): Notification {
  const defaultNotif = {
    id: 1,
    title: "title",
    message: "message",
    type: "notification",
    sticky: false
  };
  return Object.assign(defaultNotif, notif);
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

test("can subscribe and add notification", () => {
  let notified = false;
  const notifications = new NotificationManager();
  notifications.on("notification_added", {}, () => (notified = true));
  expect(notified).toBe(false);
  const id = notifications.add(makeNotification());
  expect(notified).toBe(true);
  expect(id).toBeDefined();
});

test("can close a notification", () => {
  const notifications: INotificationManager = new NotificationManager();
  let notified = false;
  notifications.on("notification_closed", {}, () => (notified = true));

  const id = notifications.add(makeNotification());
  expect(notified).toBe(false);

  notifications.close(id);
  expect(notified).toBe(true);
});
