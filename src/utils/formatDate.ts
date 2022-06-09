export function formateDate(date: string): string {
  const splitedDate = date.split('T');
  const newSplitedDate = splitedDate[0].split('-');
  const newDateFormatted =
    newSplitedDate[2] + '/' + newSplitedDate[1] + '/' + newSplitedDate[0];

  return newDateFormatted;
}
