import moment from "moment";
// import { createIntl, createIntlCache, useIntl } from "react-intl";
import { createIntl } from "react-intl";
import LanguageCodes from "../../@softbd/utilities/LocaleLanguage";
import { createIntlCache } from '@formatjs/intl';
// const { messages, formatDate, locale, formatNumber } = useIntl();



export const calendarService = (eventsList: any[], intlOptions: any) => {
  const { messages, formatDate, locale, formatNumber } = intlOptions;
  const dateFormat = 'YYYY-MM-DD';
  const startDates = eventsList.map((e) =>
    moment(e.start).format(dateFormat),
  ) as string[];
  const hasEvent = (currentDate: string, allDates: string[]): boolean =>
    allDates.find((e) => e == currentDate) != undefined;
  const parsDate = (datevalue: any): string =>
    moment(datevalue).format(dateFormat);

  const cache = createIntlCache();
  const intl = createIntl(
    {
      locale: locale,
      messages: {},
    },
    cache,
  );

  const customDateCellWrap = (e: any) => {
    const dateNumber = intl.formatNumber(e.label);
    const dateFontSize = { fontSize: '1.5rem' };
    const dateSpan = <span style={dateFontSize}>{dateNumber}</span>;
    return (
      <div>
        {hasEvent(parsDate(e.date), startDates) ? (
          <div style={{ position: 'relative' }}>{dateSpan}</div>
        ) : (
          dateSpan
        )}
      </div>
    );
  };

  const componentObject = {
    month: {
      dateHeader: customDateCellWrap,
      header: (e: any) => {
        const lbl = messages[`calendar.${e.label}`];
        return <span>{lbl}</span>;
      },
    },
    week: {
      header: (e: any) => {
        const labelArr = e.label.split(' ');
        const lbl = messages[`calendar.${labelArr[1]}`];
        return <span>{lbl}</span>;
      },
    },
  };

  const calendarFormatOption = {
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
  return {
    componentObject,
    calendarFormatOption
  }
}





