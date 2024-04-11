function toRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function checkLocation(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  // Радиус Земли в километрах
  const earthRadius = 6371;

  // Преобразование широт и долгот из градусов в радианы
  const radLat1 = toRadians(lat1);
  const radLon1 = toRadians(lon1);
  const radLat2 = toRadians(lat2);
  const radLon2 = toRadians(lon2);

  // Разница широт и долгот
  const latDiff = radLat2 - radLat1;
  const lonDiff = radLon2 - radLon1;

  // Вычисление расстояния с помощью формулы гаверсинуса
  const a =
    Math.sin(latDiff / 2) ** 2 +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(lonDiff / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Расстояние между точками в километрах
  const distance = earthRadius * c;
console.log(distance);

  return distance;
}

// // Пример использования функции
// const lat1 = 49.4226143881765; // Широта первой точки
// const lon1 = 26.980108597562204; // Долгота первой точки

// const lon2 = 27.062384; // Широта второй точки
// const lat2 = 50.175004; // Долгота второй точки

// const result = haversine(lat1, lon1, lat2, lon2);
// // console.log(`Расстояние между точками: ${result} км`);
