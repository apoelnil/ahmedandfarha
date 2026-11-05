/**
 * Calendar generation utilities for Ahmed & Farha Engagement
 */

export const EVENT_DETAILS = {
  title: 'Ahmed & Farha — Our Engagement',
  description: 'Join us to celebrate the engagement of Ahmed & Farha at Golden Gate Villa, New Cairo.\nLocation: https://maps.app.goo.gl/cqbGd2ZReXWXKsYy6\n\nWaiting for you to celebrate with us.',
  location: 'Golden Gate Villa, New Cairo',
  locationUrl: 'https://maps.app.goo.gl/cqbGd2ZReXWXKsYy6',
  startDateUtc: '20261116T160000Z',
  endDateUtc: '20261116T220000Z',
  dateFormatted: 'Monday, 16 November 2026',
  dateShort: '16 · 11 · 2026',
  timeFormatted: '06:00 PM',
  venue: 'Golden Gate Villa',
  address: 'New Cairo',
  celebrationMessage: 'WAITING FOR YOU TO CELEBRATE WITH US',
};

/**
 * Builds dynamic Google Calendar render URL
 */
export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: EVENT_DETAILS.title,
    dates: `${EVENT_DETAILS.startDateUtc}/${EVENT_DETAILS.endDateUtc}`,
    details: EVENT_DETAILS.description,
    location: EVENT_DETAILS.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Returns webcal URL for Apple Calendar
 * The webcal:// scheme prompts the native Calendar application to add/subscribe the event
 * directly, preventing browsers from triggering an unwanted file download dialog.
 */
export function getAppleCalendarUrl(): string {
  if (typeof window === 'undefined') return '/invite.ics';
  const host = window.location.host;
  return `webcal://${host}/invite.ics`;
}

/**
 * Directly opens Apple Calendar via webcal protocol or inline calendar stream
 */
export function openAppleCalendar(): void {
  if (typeof window === 'undefined') return;
  const webcalUrl = getAppleCalendarUrl();
  window.location.href = webcalUrl;
}
