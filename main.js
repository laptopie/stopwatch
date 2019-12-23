var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');
var lapBtn = document.getElementById('lap');
var laps = document.getElementById('laps');
var deleteBtn = document.getElementById('delete'); 
var watch = new Stopwatch(timer);


toggleBtn.addEventListener('click', function () {
    if (watch.isOn) {
        watch.stop();
        toggleBtn.textContent = 'Start';
    } else {
        watch.start();
        toggleBtn.textContent = 'Stop';
    }
});

resetBtn.addEventListener('click', function () {
    watch.reset();

});





function Stopwatch(elem) {
    var time = 0;
    var interval;
    var offset;

    function update() {
        if (this.isOn) {
            time += delta();
        }
        var formattedTime = timeFormatter(time);
        elem.textContent = formattedTime;
    }

    function delta() {
        var now = Date.now();
        var timePassed = now - offset;
        offset = now;
        return timePassed;
    }

    function timeFormatter(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);
        var hours = time.getHours().toString()-1;
        var minutes = time.getMinutes().toString();
        var seconds = time.getSeconds().toString();
        var milliseconds = time.getMilliseconds().toString();


        if (hours.length < 2) {
            hours = '0' + hours; 
        } 

        if (minutes.length < 2) {
            minutes = '0' + minutes;
        }

        if (seconds.length < 2) {
            seconds = '0' + seconds;
        }

        while (milliseconds.length < 3) {
            milliseconds = '0' + milliseconds
        }

        return hours + ' : ' + minutes + ' : ' + seconds + ' . ' + milliseconds;
    }

    this.isOn = false;

    this.start = function () {
        if (!this.isOn) {
            interval = setInterval(update.bind(this), 10);
            offset = Date.now();
            this.isOn = true;
        }

    };

    this.stop = function () {
        if (this.isOn) {
            clearInterval(interval);
            interval = null;
            this.isOn = false;
        }
    };

    this.reset = function () {
        if (!this.isOn) {
            time = 0;
            update();
        }
    };


    this.lap = function () {
        if (!this.isOn) {

        }
    }

    lapBtn.addEventListener('click', function () {
        if (!watch.isOn) {
            var table = document.getElementById("myTable");
            var row = table.insertRow(0);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = timer.innerHTML;
            cell2.innerHTML = new Date().toUTCString();
        }

    });
    deleteBtn.addEventListener('click', function() {
            document.getElementById("myTable").deleteRow(0); 
    }); 
    
    

};

