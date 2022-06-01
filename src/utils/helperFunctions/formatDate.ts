export default function formatDate(date: Date): string {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth() + 1;
    const currentDate = date.getDate();

    return `${currentDate}/${currentMonth}/${currentYear}`;
}
