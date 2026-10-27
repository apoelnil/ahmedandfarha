import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function calendarPlugin(): Plugin {
  return {
    name: 'calendar-ics-handler',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/invite.ics' || req.url?.startsWith('/invite.ics')) {
          res.setHeader('Content-Type', 'text/calendar; charset=utf-8');
          res.setHeader('Content-Disposition', 'inline; filename="invite.ics"');
          res.setHeader('Cache-Control', 'no-cache');
          const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Ahmed and Farha//Engagement Invitation//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID:ahmed-farha-engagement-20261113@invitation',
            'DTSTAMP:20261018T000000Z',
            'DTSTART:20261113T160000Z',
            'DTEND:20261113T220000Z',
            'SUMMARY:Ahmed & Farha — Our Engagement',
            'DESCRIPTION:Join us to celebrate the engagement of Ahmed & Farha at 263 st villa 4 new maadi.\\nLocation: https://maps.app.goo.gl/CaNug9JzoVSNQxUa8\\n\\nWaiting for you to celebrate with us.',
            'LOCATION:263 st villa 4 new maadi',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'BEGIN:VALARM',
            'TRIGGER:-P1D',
            'ACTION:DISPLAY',
            'DESCRIPTION:Reminder: Ahmed & Farha Engagement Tomorrow!',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR',
          ].join('\r\n');
          res.end(icsContent);
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), calendarPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
