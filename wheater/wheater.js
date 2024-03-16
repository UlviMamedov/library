const weather = {
    "Пн": 20,
    "Вт": 22,
    "Ср": 19,
    "Чт": 18,
    "Пт": 21,
    "Сб": 23,
    "Нд": 24,

    averageTemperature: function() {
        const temperatures = Object.values(this).filter(temp => typeof temp === 'number');
        const total = temperatures.reduce((acc, temp) => acc + temp, 0);
        return total / temperatures.length;
    },

    maxTemperature: function() {
        const temperatures = Object.values(this).filter(temp => typeof temp === 'number');
        return Math.max(...temperatures);
    },

    minTemperature: function() {
        const temperatures = Object.values(this).filter(temp => typeof temp === 'number');
        return Math.min(...temperatures);
    },

    toString: function() {
        const days = Object.keys(this).join(" - ");
        return `(${days})`;
    },

    valueOf: function() {
        return this.averageTemperature();
    }
};

console.log("Середня температура за тиждень:", weather.averageTemperature());
console.log("Максимальна температура за тиждень:", weather.maxTemperature());
console.log("Мінімальна температура за тиждень:", weather.minTemperature());

console.log("Строкове представлення об'єкту погоди:", String(weather));
console.log("Числове представлення об'єкту погоди:", weather.valueOf());