const monthN = {   // Название месяца
    0: ["Январь", "01"],
    1: ["Февраль", "02"],
    2: ["Март", "03"],
    3: ["Апрель", "04"],
    4: ["Май", "05"],
    5: ["Июнь", "06"],
    6: ["Июль", "07"],
    7: ["Август", "08"],
    8: ["Сентябрь", "09"],
    9: ["Октябрь", "10"],
    10: ["Ноябрь", "11"],
    11: ["Декабрь", "12"],
  }   

export default {
  updateTitle :function ( date) {
    let title = monthN[date.getMonth()][0] + " " + date.getFullYear();
   
    return title
  },

  updateMonth :function ( date) {
  
    return monthN[date.getMonth()][1]
  }

  
}