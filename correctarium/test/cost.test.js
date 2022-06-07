const cost = require('../modules/cost');

describe('Tests module cost:', () => {

  test('language', () => {
    expect(cost.costCalculation('ru', 10000, 'doc')).toBeCloseTo(500);
    expect(cost.costCalculation('uk', 10000, 'doc')).toBeCloseTo(500);
    expect(cost.costCalculation('en', 10000, 'doc')).toBeCloseTo(1200);
  });

  test('extension', () => {
    expect(cost.costCalculation('ru', 500, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('ru', 1000, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('ru', 2000, 'doc')).toBeCloseTo(100);
    expect(cost.costCalculation('ru', 500, 'zip')).toBeCloseTo(50);
    expect(cost.costCalculation('ru', 1000, 'zip')).toBeCloseTo(60);
    expect(cost.costCalculation('ru', 2000, 'zip')).toBeCloseTo(120);

    expect(cost.costCalculation('uk', 100, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('uk', 1100, 'doc')).toBeCloseTo(55);
    expect(cost.costCalculation('uk', 6000, 'doc')).toBeCloseTo(300);
    expect(cost.costCalculation('uk', 100, 'zip')).toBeCloseTo(50);
    expect(cost.costCalculation('uk', 1100, 'zip')).toBeCloseTo(66);
    expect(cost.costCalculation('uk', 6000, 'zip')).toBeCloseTo(360);

    expect(cost.costCalculation('en', 500, 'doc')).toBeCloseTo(120);
    expect(cost.costCalculation('en', 1000, 'doc')).toBeCloseTo(120);
    expect(cost.costCalculation('en', 10000, 'doc')).toBeCloseTo(1200);
    expect(cost.costCalculation('en', 500, 'zip')).toBeCloseTo(120);
    expect(cost.costCalculation('en', 1000, 'zip')).toBeCloseTo(144);
    expect(cost.costCalculation('en', 10000, 'zip')).toBeCloseTo(1440);
  }
  );

  test('minimum cost', () => {
    expect(cost.costCalculation('ru', 200, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('ru', 400, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('ru', 800, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('ru', 1000, 'doc')).toBeCloseTo(50);

    expect(cost.costCalculation('uk', 100, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('uk', 500, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('uk', 700, 'doc')).toBeCloseTo(50);
    expect(cost.costCalculation('uk', 999, 'doc')).toBeCloseTo(50);

    expect(cost.costCalculation('en', 150, 'doc')).toBeCloseTo(120);
    expect(cost.costCalculation('en', 300, 'doc')).toBeCloseTo(120);
    expect(cost.costCalculation('en', 760, 'doc')).toBeCloseTo(120);
    expect(cost.costCalculation('en', 995, 'doc')).toBeCloseTo(120);
  });
});