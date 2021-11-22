// eslint-disable-next-line import/prefer-default-export
export function fitToColumn(arrayOfArray: any) {
  // get maximum character of each column
  return arrayOfArray[5].map((a: any, i: any) => ({
    wch: Math.max(
      ...arrayOfArray.map((a2: any) =>
        a2[i] ? a2[i].toString().length + 3 : 0
      )
    ),
  }));
}
