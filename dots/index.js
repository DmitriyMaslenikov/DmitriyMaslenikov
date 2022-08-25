// --------- Блок решения задачи

function arrLine(str) {
  const n = str.length;
  let arr = [str[n - 1]];
  for (let i = n - 1; i > 0; i--) {
    arr = dot(arr, str, i);
  }
  return arr;
}

function dot(arr, str, n) {
  let arrRes = [];
  arr.forEach((element) => {
    arrRes.push(str[n - 1] + element, str[n - 1] + '.' + element);
  });
  return arrRes;
}

// ------------Блок помощников

// -------- Проверка ожидаемого размера массива

function expectLength(arr, longString, str) {
  const uniqueValues = new Set(arr);
  if (uniqueValues.size === longString) {
    console.log(
      'OK',
      'Строка -' + str,
      'Ожидаемый размер массива - ' + longString
    );
  } else {
    throw new Error(
      'Строка -' +
        str +
        '  Размер массива - ' +
        String(arr.length) +
        ' несоответствует ожидаемому - ' +
        String(longString)
    );
  }
}

// -------- Проверка ожидаемого  массива

function expectArraysAreEqual(arr, arrTest, str) {
  let err = 0;
  arr.forEach((element) => {
    arrTest.forEach((elementTest) => {
      element === elementTest ? err++ : err;
    });
  });
  if (err === arrTest.length) {
    console.log('OK', 'Строка -' + str, 'Массив -', arrTest);
  } else {
    throw new Error('Строка -' + str + '   Массив несоответствует ожидаемому');
  }
}

// ------------- Блок тестов

// -------- Проверка ожидаемого размера массива

const arrString = [
  '124nmm*3#&?fhfgh',
  'weyiwyeiudeiukwwj',
  'abcdddddddfggg',
  'abcdefgbbbb',
];

arrString.forEach((string) =>
  expectLength(arrLine(string), 2 ** (string.length - 1), string)
);

// -------- Проверка ожидаемого  массива.

const arrString2 = [
  ['ab', ['ab', 'a.b']],
  ['abc', ['abc', 'a.bc', 'ab.c', 'a.b.c']],
  [
    'abcd',
    [
      'abcd',
      'a.bcd',
      'ab.cd',
      'a.b.cd',
      'abc.d',
      'ab.c.d',
      'a.bc.d',
      'a.b.c.d',
    ],
  ],
];

arrString2.forEach((arr) =>
  expectArraysAreEqual(arrLine(arr[0]), arr[1], arr[0])
);
