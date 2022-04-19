import { createIntl, createIntlCache, useIntl } from "react-intl";
import LanguageCodes from "../../@softbd/utilities/LocaleLanguage";

const { messages, formatDate, locale, formatNumber } = useIntl();

const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: locale,
      messages: {},
    },
    cache,
  );

export const calendarFormatOption =  {
      monthHeaderFormat: (date: any) => {
        return formatDate(date, {
          month: 'long',
          year: 'numeric',
        });
      },
      dayRangeHeaderFormat: (range: any) => {
        let lbl = '';
        if (range.start.getMonth() == range.end.getMonth()) {
          lbl += formatDate(range.start, {
            month: 'long',
          });
          lbl +=
            ' ' +
            formatNumber(range.start.getDate()) +
            ' - ' +
            formatNumber(range.end.getDate());
        } else {
          lbl += formatDate(range.start, {
            month: 'long',
            day: 'numeric',
          });
          lbl += ' - ';
          lbl += formatDate(range.end, {
            month: 'long',
            day: 'numeric',
          });
        }
    
        return lbl;
      },
      dayHeaderFormat: (date: any) => {
        return formatDate(date, {
          weekday: 'long',
          month: 'short',
          day: '2-digit',
        });
      },
      agendaHeaderFormat: (range: any) => {
        let lbl = '';
        lbl += formatDate(range.start);
        lbl += ' - ';
        lbl += formatDate(range.end);
    
        return lbl;
      },
      timeGutterFormat: (date: any) => {
        let format = intl.formatTime(date, {
          hour: '2-digit',
          minute: '2-digit',
          hourCycle: 'h12'
        });
        const [time, ampm] = format.split(' ');
        if (locale === LanguageCodes.BN) {
          format = `${time} ${messages[ampm]}`;
        }
        return format;
      }
    
  }
  