/**
 * Timer
 * 
 * Construtor de um contador com as funções básicas para o mesmo
 * 
 * @author Gustavo Vilas Boas
 * @since 03-2017
 */
function Timer(){

    // instancia atual do Timer
    var self = this;

    // guarda o setInterval
    var clock = null;

    // callback usado quando o contador muda
    var callback = null;

    // timestamp de quando o contador começou
    var startedAt = null;

    // timestamp de quando o contador deve parar
    var limit = null;

    // o tempo transcorrido desde o inicio da contagem
    var counter = 0;

    // indica se o contador está rodando ou não
    var isRunning = false;

    // intervalo usado no contador
    var interval = 1000;

    /**
     * hoursToSeconds
     * 
     * converte as horas para segundos
     * 
     * @see { A string de horas deve estar no formato HH:MM:SS ou MM:SS ou SS }
     * @param {string} str string representando as horas
     * @return {string} os segundos presentes nessa hora
     */
    var hoursToSeconds = function( str ) {

        // pega as partes da hora 
        var p = str.split(':'), s = 0, m = 1;
        while (p.length > 0) {

            // seta os minutos e segundos
            s += m * parseInt(p.pop(), 10);
            m *= 60;
        }

        // retorna os segundos
        return s;
    }

    /**
     * increment
     * 
     * incrementa o contador em um
     * 
     */
    var increment = function(){

        // verifica se o contador está rodando
        if ( isRunning ) {

            // incrementa o contados
            counter++;

            // verifica se existe um callback
            if ( callback ) callback( self );

            // se atingiu o limite, para a contagem
            if ( limit && counter === limit ) self.stop();
        }
    }

    /**
     * onChange
     * 
     * Adiciona um callback para toda vez que o contador mudar
     * 
     * @param {callback} cd o callback a ser executado
     */
    self.onChange = function( cb ) {
        callback = cb;
    }

    /**
     * setLimit
     * 
     * seta o limite do contador
     * @see { A string de horas deve estar no formato HH:MM:SS ou MM:SS ou SS }
     * @param {string} limite string representando as horas
     */
    self.setLimit = function( limite ) {
        var seconds = hoursToSeconds( limite );
        limit = startedAt + seconds;
    }

    /**
     * addTimeToLimit
     * 
     * Adiciona mais tempo ao limite atual
     * 
     * @see { A string de horas deve estar no formato HH:MM:SS ou MM:SS ou SS }
     * @param {sting} toAdd a quantidade de tempo a ser adicionada ao limite atual
     */
    self.addTimeToLimit = function( toAdd ) {
        var seconds = hoursToSeconds( toAdd );
        limit = limit + seconds;
    }

    /**
     * getTime
     * 
     * Retorna o tempo transcorrido ate o momento
     */
    self.getTime = function(){
        return counter;
    }

    /**
     * running
     * 
     * Indica se o contador está rodando ou não
     */
    self.running = function(){
        return isRunning;
    }

    /**
     * run
     * 
     * Inicia o contador
     */
    self.run = function(){

        // verifica se o contador já está rodando
        if ( isRunning ) return false;

        // seta o isRunning como true
        isRunning = true;

        // inicia o startedAt, caso já não o tenha feito
        startedAt = startedAt ? startedAt : new Date().getTime() / 1000;

        // inicia o clock
        clock = setInterval( function() { 
            increment(); 
        }, interval );
    }

    /**
     * stop
     * 
     * Para o contador
     */
    self.stop = function(){
        clearInterval( clock );
        isRunning = false;
    }
}