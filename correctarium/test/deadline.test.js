const deadline = require('../modules/deadline');

describe('Tests module dedline', () => {

    test('time min', () => {
        expect(deadline.getTime('ru', 666, 'doc')).toBe(3600000);
        expect(deadline.getTime('ru', 400, 'doc')).toBe(3600000);
        expect(deadline.getTime('ru', 200, 'doc')).toBe(3600000);
        expect(deadline.getTime('ru', 200, 'zip')).toBe(3600000);
        expect(deadline.getTime('ru', 400, 'zip')).toBe(3600000);
        expect(deadline.getTime('ru', 666, 'zip')).toBe(4318380);

        expect(deadline.getTime('uk', 650, 'doc')).toBe(3600000);
        expect(deadline.getTime('uk', 300, 'doc')).toBe(3600000);
        expect(deadline.getTime('uk', 250, 'doc')).toBe(3600000);
        expect(deadline.getTime('uk', 250, 'zip')).toBe(3600000);
        expect(deadline.getTime('uk', 300, 'zip')).toBe(3600000);
        expect(deadline.getTime('uk', 650, 'zip')).toBe(4266527);

        expect(deadline.getTime('en', 166, 'doc')).toBe(3600000);
        expect(deadline.getTime('en', 110, 'doc')).toBe(3600000);
        expect(deadline.getTime('en', 80, 'doc')).toBe(3600000);
        expect(deadline.getTime('en', 80, 'zip')).toBe(3600000);
        expect(deadline.getTime('en', 110, 'zip')).toBe(3600000);
        expect(deadline.getTime('en', 166, 'zip')).toBe(4313514);

    });
    test('time', () => {
        expect(deadline.getTime('uk', 1333, 'doc')).toBe(5400000);
        expect(deadline.getTime('uk', 2666, 'doc')).toBe(9000000);
        expect(deadline.getTime('uk', 13330, 'doc')).toBe(37800000);
        expect(deadline.getTime('uk', 1333, 'zip')).toBe(6480000);
        expect(deadline.getTime('uk', 2666, 'zip')).toBe(10800000);
        expect(deadline.getTime('uk', 13330, 'zip')).toBe(45360000);

        expect(deadline.getTime('ru', 26660, 'doc')).toBe(73800000);
        expect(deadline.getTime('ru', 4665, 'doc')).toBe(14398650);
        expect(deadline.getTime('ru', 5332, 'doc')).toBe(16200000);
        expect(deadline.getTime('ru', 26660, 'zip')).toBe(88560000);
        expect(deadline.getTime('ru', 4665, 'zip')).toBe(17278380);
        expect(deadline.getTime('ru', 5332, 'zip')).toBe(19440000);

        expect(deadline.getTime('en', 333, 'doc')).toBe(5400000);
        expect(deadline.getTime('en', 666, 'doc')).toBe(9000000);
        expect(deadline.getTime('en', 3330, 'doc')).toBe(37800000);
        expect(deadline.getTime('en', 333, 'zip')).toBe(6480000);
        expect(deadline.getTime('en', 666, 'zip')).toBe(10800000);
        expect(deadline.getTime('en', 3330, 'zip')).toBe(45360000);

    });

    test('deadline holiday', () => {
        expect((new Date(deadline.deadlineCalculation(3600000))).getDay()).not.toBe(0);
        expect((new Date(deadline.deadlineCalculation(57400000))).getDay()).not.toBe(0);
        expect((new Date(deadline.deadlineCalculation(219000000))).getDay()).not.toBe(0);
        expect((new Date(deadline.deadlineCalculation(14800000))).getDay()).not.toBe(0);
        expect((new Date(deadline.deadlineCalculation(43700000))).getDay()).not.toBe(0);
        expect((new Date(deadline.deadlineCalculation(55630000))).getDay()).not.toBe(0);

        expect((new Date(deadline.deadlineCalculation(3600000))).getDay()).not.toBe(6);
        expect((new Date(deadline.deadlineCalculation(57400000))).getDay()).not.toBe(6);
        expect((new Date(deadline.deadlineCalculation(219000000))).getDay()).not.toBe(6);
        expect((new Date(deadline.deadlineCalculation(14800000))).getDay()).not.toBe(6);
        expect((new Date(deadline.deadlineCalculation(43700000))).getDay()).not.toBe(6);
        expect((new Date(deadline.deadlineCalculation(55630000))).getDay()).not.toBe(6);
    });

    test('deadline workTime', () => {
        expect((new Date(deadline.deadlineCalculation(3600000))).getHours() < 10).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(3000000))).getHours() < 10).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(56000000))).getHours() < 10).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(76000000))).getHours() < 10).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(9600000))).getHours() < 10).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(7600000))).getHours() < 10).toBeFalsy();

        expect((new Date(deadline.deadlineCalculation(39000000))).getHours() >= 19).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(486000000))).getHours() >= 19).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(54600000))).getHours() >= 19).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(77000000))).getHours() >= 19).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(333000000))).getHours() >= 19).toBeFalsy();
        expect((new Date(deadline.deadlineCalculation(36678000000))).getHours() >= 19).toBeFalsy();
    });
});