export const  Months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
export const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export const CalendarPage = function(date, currentMonth) {
    this.date = date;
    this.ref = new Date();
    this.currentMonth = currentMonth
    this.choosen = false;
    this.index = -1;
    this.today = (this.date.getDate() == this.ref.getDate() && this.date.getMonth() == this.ref.getMonth() && 
    this.date.getFullYear() == this.ref.getFullYear()) ?  true : false;   
    this.outside = (this.date.getMonth() == this.currentMonth) ? false : true;
    this.getDate = () => {
        return this.date;
    }

    this.getDay = () => {
        return this.date.getDate();
    }
}