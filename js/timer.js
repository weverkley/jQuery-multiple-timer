$(document).ready(function() {

    var timer = [],
        interval = 1000,
        value = 0,
        counter = 1;

    $(document).on('click', '.btn-start', function() {
        var This = $(this);
        if (!timer.indexOf(This.parents('tr').data('id'))) return;
        timer[This.parents('tr').data('id')] = setInterval(function() {
            var time = This.parents('tr').children('.timer-start').html();
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

            This.parents('tr').children('.timer-start').html(h + ":" + m + ":" + s);
        }, interval);
    });

    $(document).on('click', '.btn-pause', function() {
        clearInterval(timer[$(this).parents('tr').data('id')]);
        timer[$(this).parents('tr').data('id')] = null;
    });

    $(document).on('click', '.btn-stop', function() {
        $(this).parents('tr').remove();
    });

    $(document).on('click', '.add-counter', function() {
        $('#counters tbody').append(
            counterLayout(counter)
        );
        counter++;
    });

    function checkTime(i) {
        if (i < 10) { i = "0" + i }; // add zero in front of numbers < 10
        return i;
    }

    function returnDate(d) {
        return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes() + ':' + (d.getSeconds() < 10 ? '0' : '') + d.getSeconds();
    }

    function counterLayout(id) {
        var ds = new Date(),
            de = new Date();

        de.setHours(ds.getHours() + 1, ds.getMinutes(), ds.getSeconds());

        return '<tr class="counter" data-id="' + id + '" id="timer-' + id + '">' +
            '<th scope="row">' + id + '</th>' +
            '<td class="timer-start">' + returnDate(ds) + '</td>' +
            '<td class="timer-end">' + returnDate(de) + '</td>' +
            '<td>1 Hora</td>' +
            '<th scope="row">' +
            '<button class="btn-small btn-success btn-start"><i class="material-icons">play_arrow</i></button>' +
            '<button class="btn-small btn-warning btn-pause"><i class="material-icons">pause</i></button>' +
            '<button class="btn-small btn-danger btn-stop"><i class="material-icons">block</i></button>' +
            '</th>' +
            '</tr>'
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