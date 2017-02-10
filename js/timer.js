$(document).ready(function() {

    var timer = null,
        interval = 1000,
        value = 0;

    $("#timer-1 .btn-start").click(function() {
        if (timer !== null) return;
        timer = setInterval(startTime, interval);
    });

    $("#timer-1 .btn-stop").click(function() {
        clearInterval(timer);
        timer = null
    });

    function startTime() {
        var time = $('#timer-1 .timer-start').html();
        time = time.split(':');
        var h = parseInt(time[0]);
        var m = parseInt(time[1]);
        var s = parseInt(time[2]);

        s++;

        if (s > 59) {
            s = 0;
            m++;
        }

        if (m > 59) {
            m = 0;
            h++;
        }

        h = checkTime(h);
        m = checkTime(m);
        s = checkTime(s);

        $('#timer-1 .timer-start').html(h + ":" + m + ":" + s);

    }

    function checkTime(i) {
        if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
        return i;
    }

    /* Ajustar hora de início em linha */
    $(document).on('click', '.timer-start', function() {
        var This = $(this),
            old;

        old = This.html();

        This.removeClass('timer-start');

        This.html(
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="start-timer" value="' + old + '" style="max-width: 82px;">' +
            '</div>'
        );

        $('[id="start-timer"]').mask('00:00:00').focus();

        $(document).on('keypress blur', '[id="start-timer"]', function(e) {
            function leave() {
                This.html($('[id="start-timer"]').val());
                This.addClass('timer-start');
            }

            if (e.type == 'focusout') leave();

            if (e.type == 'keypress') {
                if (e.keyCode == 13) leave();
            }
        });
    });

    /* Ajustar hora de fim em linha */
    $(document).on('click', '.timer-end', function() {
        var This = $(this),
            old;

        old = This.html();

        This.removeClass('timer-end');

        This.html(
            '<div class="form-group">' +
            '<input type="text" class="form-control" id="end-timer" value="' + old + '" style="max-width: 82px;">' +
            '</div>'
        );

        $('[id="end-timer"]').mask('00:00:00').focus();

        $(document).on('keypress blur', '[id="end-timer"]', function(e) {
            function leave() {
                This.html($('[id="end-timer"]').val());
                This.addClass('timer-end');
            }

            if (e.type == 'focusout') leave();

            if (e.type == 'keypress') {
                if (e.keyCode == 13) leave();
            }
        });
    });
});