export const  Months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];
export const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


export const Calendar = function(date) {
    this.date = date;
    this.today = false;
    this.days = this.getDaysInMonth();
    this.getDate = () => {
        return this.date;
    }

    this.getDaysInMonth = (month, year) =>{
        var date = new Date(year, month, 1);
        var days = [];
        while (date.getMonth() === month) {
           days.push(new Date(date));
           date.setDate(date.getDate() + 1);
        }
        return days;
   }

}