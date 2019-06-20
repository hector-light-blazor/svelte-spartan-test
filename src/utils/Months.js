export const  Months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
export const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export const CalendarPage = function(date) {
    this.date = date;
    this.ref = new Date();
    this.today = (this.date.getDate() == this.ref.getDate() && this.date.getMonth() == this.ref.getMonth() && 
    this.date.getFullYear() == this.ref.getFullYear()) ?  true : false;   
    this.getDate = () => {
        return this.date;
    }
}