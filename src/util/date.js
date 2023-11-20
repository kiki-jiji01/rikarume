export const caluculateLastLoginHourTime = (lastLoginTime) => {
  const targetDate = new Date(lastLoginTime);
  const currentDate = new Date();
  // 時間差を計算
  const timeDifference = currentDate - targetDate;
  // ミリ秒単位から時間単位に変換
  return Math.floor(timeDifference / (1000 * 60 * 60));
};

export const transformedDate = (dateProps) => {
  const date = new Date(dateProps);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}年${month}月${day}日`;
};

export const transformedTime = (dateProps) => {
  console.log(dateProps);
  const date = new Date(dateProps);
  const hours = String(date?.getHours()).padStart(2, "0");
  const minutes = String(date?.getMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
