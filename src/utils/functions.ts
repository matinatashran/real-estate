// Convert first letter to uppercase
export function toUpperCaseFirstLetter(str: string): string {
  return str[0].toUpperCase() + str.slice(1, str.length);
}

// Sort list by lastest update
export function sortByLastestUpdate(list: any[]): any[] {
  const result: any = list.sort(function (first: any, second: any) {
    return (
      Number(new Date(second.updatedAt)) - Number(new Date(first.updatedAt))
    );
  });

  return result;
}
