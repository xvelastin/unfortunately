
    /* commonly called functions */

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function ConvertAtoDb(amp) {
        var db;
        if (amp > ConvertDbtoA(-70)) {
            db = 20 * Math.log(amp) / Math.log(10);
        }
        else db = -70;
        return db;
    }

    function ConvertDbtoA(db) {
        let amp = Math.pow(10, db / 20);
        return amp;
    }