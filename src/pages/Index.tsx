import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";
import HlsPlayer from "@/components/HlsPlayer";

type IconName = Parameters<typeof Icon>[0]["name"];

const HERO_IMG = "https://cdn.poehali.dev/projects/73d70427-a8fe-40ee-8a88-73289f863f59/files/56603231-4ab2-4a2d-b7e9-44a0a3d01b79.jpg";
const GEROI_IMG = "https://cdn.poehali.dev/projects/73d70427-a8fe-40ee-8a88-73289f863f59/bucket/2beab79f-b623-4060-a97a-3bb65a2ab621.jpeg";

const TV_CHANNELS = [
  { id: 1,  name: "Первый канал",  emoji: "1️⃣", color: "#e63946", desc: "Главный федеральный канал", stream: "http://rt-vlg-nn-htlive.cdn.ngenix.net/hls/CH_R03_OTT_VLG_NN_1TV/variant.m3u8?version=2" },
  { id: 2,  name: "Россия 1",      emoji: "📺", color: "#c0392b", desc: "ВГТРК · Новости и сериалы",  stream: "https://vgtrkregion-reg.cdnvideo.ru/vgtrk/0/russia1-hd/index.m3u8" },
  { id: 3,  name: "НТВ",           emoji: "🎙️", color: "#457b9d", desc: "Новости и программы",        stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_NTV/variant.m3u8" },
  { id: 4,  name: "Россия 24",     emoji: "📡", color: "#1d3557", desc: "Новости 24 часа",            stream: "https://vgtrkregion-reg.cdnvideo.ru/vgtrk/abakan/russia24-sd/index.m3u8" },
  { id: 5,  name: "Пятый канал",   emoji: "5️⃣", color: "#2d6a4f", desc: "Документальные фильмы",     stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_5TV/variant.m3u8" },
  { id: 6,  name: "РЕН ТВ",        emoji: "🔍", color: "#6d2b8b", desc: "Расследования и репортажи",  stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_RENTV/variant.m3u8" },
  { id: 7,  name: "СТС",           emoji: "🎭", color: "#f4a261", desc: "Сериалы и развлечения",      stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_STS/variant.m3u8" },
  { id: 8,  name: "ТНТ",           emoji: "😂", color: "#e9c46a", desc: "Юмор и комедии",             stream: "https://streaming.televizor-24-tochka.ru/live/38.m3u8" },
  { id: 9,  name: "Культура",      emoji: "🎨", color: "#8d5524", desc: "Театр, музыка, кино",        stream: "https://vgtrkregion-reg.cdnvideo.ru/vgtrk/0/kultura-hd/index.m3u8" },
  { id: 10, name: "Матч ТВ",       emoji: "⚽", color: "#2196F3", desc: "Спорт и трансляции",         stream: null },
  { id: 11, name: "ОТР",           emoji: "🏛️", color: "#3d405b", desc: "Общественное телевидение",   stream: null },
  { id: 12, name: "Карусель",      emoji: "🎠", color: "#e91e8c", desc: "Детский канал",              stream: "https://zabava-htlive.cdn.ngenix.net/hls/CH_KARUSEL/variant.m3u8" },
];

function vkEmbed(videoId: string): string {
  return `https://vk.com/video_ext.php?oid=-234589463&id=${videoId}&hd=2&autoplay=1`;
}

const GEROI_SEASON1 = [
  { ep: 1, title: "Новые герои", videoId: "456239052" },
  { ep: 2, title: "Плохая примета", videoId: "456239053" },
  { ep: 3, title: "Лунная гонка", videoId: "456239054" },
  { ep: 4, title: "Идеальный друг", videoId: "456239055" },
  { ep: 5, title: "Флаг для Генерала", videoId: "456239056" },
  { ep: 6, title: "Таинственная коробка", videoId: "456239057" },
  { ep: 7, title: "Сладкая миссия", videoId: "456239058" },
  { ep: 8, title: "Супергерой", videoId: "456239059" },
  { ep: 9, title: "Метод Флая", videoId: "456239060" },
  { ep: 10, title: "За фантазию", videoId: "456239063" },
  { ep: 11, title: "Любимая игрушка", videoId: "456239065" },
  { ep: 12, title: "Эмблема команды", videoId: "456239070" },
  { ep: 13, title: "Премия Пинки", videoId: "456239068" },
  { ep: 14, title: "Секрет Де-Кроля", videoId: "456239071" },
  { ep: 15, title: "Одиссея Бублика", videoId: "456239072" },
  { ep: 16, title: "Возвращение Пинки", videoId: "456239073" },
  { ep: 17, title: "Одиночество Бублика", videoId: "456239074" },
  { ep: 18, title: "Страшный праздник", videoId: "456239080" },
  { ep: 19, title: "Хвост О-Раша", videoId: "456239075" },
  { ep: 20, title: "История Ко-Ко", videoId: "456239076" },
  { ep: 21, title: "Конкурс точилок", videoId: "456239077" },
  { ep: 22, title: "Другая Глория", videoId: "456239079" },
  { ep: 23, title: "Мелкотрон Крузо", videoId: "456239082" },
  { ep: 24, title: "История Бублика", videoId: "456239083" },
  { ep: 25, title: "Жаркий четверг", videoId: "456239085" },
  { ep: 26, title: "Блогер", videoId: "456239087" },
];

interface ScheduleItem {
  time: string;
  title: string;
  desc: string;
  icon: string;
  age: string;
}

const TV_SCHEDULE: Record<string, ScheduleItem[]> = {
  "Первый канал": [
    { time: "06:00", title: "Доброе утро", desc: "Утренняя информационно-развлекательная программа", icon: "☀️", age: "0+" },
    { time: "09:00", title: "Новости", desc: "Актуальные события в России и мире", icon: "📰", age: "0+" },
    { time: "09:15", title: "Контрольная закупка", desc: "Проверка качества товаров народного потребления", icon: "🛒", age: "0+" },
    { time: "09:50", title: "Жить здорово!", desc: "Программа о здоровье с Еленой Малышевой", icon: "🏥", age: "0+" },
    { time: "11:00", title: "Новости", desc: "Актуальные события в России и мире", icon: "📰", age: "0+" },
    { time: "11:15", title: "Время покажет", desc: "Общественно-политическое ток-шоу", icon: "🎙️", age: "12+" },
    { time: "13:00", title: "Новости", desc: "Актуальные события в России и мире", icon: "📰", age: "0+" },
    { time: "13:15", title: "Давай поженимся!", desc: "Брачное ток-шоу с Ларисой Гузеевой", icon: "💍", age: "16+" },
    { time: "14:00", title: "Мужское/Женское", desc: "Социальное ток-шоу", icon: "👫", age: "16+" },
    { time: "15:00", title: "Новости", desc: "Актуальные события в России и мире", icon: "📰", age: "0+" },
    { time: "15:15", title: "Жди меня", desc: "Программа поиска людей", icon: "🔍", age: "0+" },
    { time: "16:00", title: "Мужское/Женское", desc: "Социальное ток-шоу", icon: "👫", age: "16+" },
    { time: "18:00", title: "Вечерние новости", desc: "Главные события дня", icon: "🌆", age: "0+" },
    { time: "18:35", title: "Давай поженимся!", desc: "Брачное ток-шоу с Ларисой Гузеевой", icon: "💍", age: "16+" },
    { time: "19:50", title: "Пусть говорят", desc: "Ток-шоу с Дмитрием Борисовым", icon: "🎤", age: "16+" },
    { time: "21:00", title: "Время", desc: "Главная информационная программа страны", icon: "🕘", age: "0+" },
    { time: "21:30", title: "Художественный фильм", desc: "Премьера вечера", icon: "🎬", age: "12+" },
    { time: "23:30", title: "Вечерний Ургант", desc: "Поздний вечерний выпуск с Иваном Ургантом", icon: "🎭", age: "16+" },
  ],
  "Россия 1": [
    { time: "05:00", title: "Утро России", desc: "Информационно-развлекательная программа", icon: "🌅", age: "0+" },
    { time: "09:00", title: "О самом главном", desc: "Программа о здоровье и красоте", icon: "💊", age: "0+" },
    { time: "10:00", title: "Вести", desc: "Информационная программа", icon: "📺", age: "0+" },
    { time: "10:25", title: "Вести. Местное время", desc: "Региональные новости", icon: "🗺️", age: "0+" },
    { time: "11:00", title: "По секрету всему свету", desc: "Семейное ток-шоу", icon: "🤫", age: "0+" },
    { time: "12:00", title: "Вести в 12:00", desc: "Дневной выпуск новостей", icon: "📰", age: "0+" },
    { time: "13:00", title: "Судьба человека", desc: "Социальное ток-шоу с Борисом Корчевниковым", icon: "👤", age: "12+" },
    { time: "14:00", title: "60 минут", desc: "Общественно-политическое ток-шоу", icon: "⏱️", age: "12+" },
    { time: "15:00", title: "Вести в 15:00", desc: "Дневной выпуск новостей", icon: "📰", age: "0+" },
    { time: "16:00", title: "Прямой эфир", desc: "Ток-шоу с Михаилом Зеленским", icon: "📡", age: "16+" },
    { time: "18:00", title: "Вести в 18:00", desc: "Вечерний выпуск новостей", icon: "🌆", age: "0+" },
    { time: "19:00", title: "60 минут", desc: "Общественно-политическое ток-шоу", icon: "⏱️", age: "12+" },
    { time: "20:00", title: "Вести в 20:00", desc: "Главный вечерний выпуск новостей", icon: "📺", age: "0+" },
    { time: "21:05", title: "Вести. Местное время", desc: "Региональные новости", icon: "🗺️", age: "0+" },
    { time: "21:20", title: "Российский сериал", desc: "Премьера сезона", icon: "🎞️", age: "12+" },
    { time: "23:30", title: "Вечер с Владимиром Соловьёвым", desc: "Политическое ток-шоу", icon: "🎙️", age: "16+" },
  ],
  "НТВ": [
    { time: "05:55", title: "НТВ Утром", desc: "Утренняя информационная программа", icon: "🌤️", age: "0+" },
    { time: "08:00", title: "Сегодня", desc: "Новости НТВ", icon: "📰", age: "0+" },
    { time: "08:25", title: "Суд присяжных", desc: "Юридическая программа", icon: "⚖️", age: "12+" },
    { time: "10:00", title: "Сегодня", desc: "Новости НТВ", icon: "📰", age: "0+" },
    { time: "10:25", title: "ДНК", desc: "Ток-шоу об установлении родства", icon: "🧬", age: "12+" },
    { time: "12:00", title: "Сегодня в 12:00", desc: "Дневной выпуск новостей", icon: "📰", age: "0+" },
    { time: "13:00", title: "Следствие вели…", desc: "Криминальные истории с Леонидом Каневским", icon: "🔎", age: "12+" },
    { time: "15:00", title: "Сегодня в 15:00", desc: "Дневной выпуск новостей", icon: "📰", age: "0+" },
    { time: "15:25", title: "Место встречи", desc: "Общественно-политическое ток-шоу", icon: "🤝", age: "12+" },
    { time: "18:00", title: "Чрезвычайное происшествие", desc: "Криминальная хроника дня", icon: "🚨", age: "16+" },
    { time: "19:00", title: "Сегодня в 19:00", desc: "Вечерний выпуск новостей", icon: "🌆", age: "0+" },
    { time: "20:00", title: "Сегодня. Итоговая программа", desc: "Главные события дня", icon: "📺", age: "0+" },
    { time: "21:00", title: "Криминальная Россия", desc: "Документальный криминальный сериал", icon: "👮", age: "16+" },
    { time: "22:00", title: "Российский детектив", desc: "Премьерный сериал", icon: "🕵️", age: "16+" },
  ],
  "Россия 24": [
    { time: "00:00", title: "Новости", desc: "Круглосуточное информационное вещание", icon: "📡", age: "0+" },
    { time: "07:00", title: "Утро. Россия 24", desc: "Утренний информационный блок", icon: "🌅", age: "0+" },
    { time: "09:00", title: "Новости", desc: "Актуальные события каждые 30 минут", icon: "📰", age: "0+" },
    { time: "10:00", title: "Специальный репортаж", desc: "Документальные расследования", icon: "🎥", age: "0+" },
    { time: "11:00", title: "Новости", desc: "Актуальные события", icon: "📰", age: "0+" },
    { time: "12:00", title: "Полдень. Россия 24", desc: "Дневной информационный блок", icon: "☀️", age: "0+" },
    { time: "14:00", title: "Новости", desc: "Актуальные события", icon: "📰", age: "0+" },
    { time: "15:00", title: "Документальный фильм", desc: "Познавательный документальный цикл", icon: "📽️", age: "0+" },
    { time: "17:00", title: "Новости", desc: "Актуальные события", icon: "📰", age: "0+" },
    { time: "18:00", title: "Вечер. Россия 24", desc: "Вечерний информационный блок", icon: "🌆", age: "0+" },
    { time: "20:00", title: "Главное", desc: "Итоги дня с ведущими Россия 24", icon: "🎙️", age: "0+" },
    { time: "21:00", title: "Новости", desc: "Поздний вечерний выпуск", icon: "🌙", age: "0+" },
    { time: "22:00", title: "Специальный репортаж", desc: "Документальные расследования", icon: "🎥", age: "0+" },
    { time: "23:00", title: "Новости", desc: "Ночной выпуск", icon: "🌙", age: "0+" },
  ],
  "Пятый канал": [
    { time: "06:00", title: "Сейчас утром", desc: "Утренняя информационная программа", icon: "🌤️", age: "0+" },
    { time: "07:00", title: "Утро на 5", desc: "Новости и события", icon: "☀️", age: "0+" },
    { time: "09:00", title: "Место происшествия", desc: "Криминальные новости", icon: "🚓", age: "12+" },
    { time: "09:30", title: "Следствие вели…", desc: "Документальные детективные истории", icon: "🔍", age: "12+" },
    { time: "12:30", title: "Сейчас", desc: "Дневной выпуск новостей", icon: "📰", age: "0+" },
    { time: "13:00", title: "Детективы", desc: "Российский детективный сериал", icon: "🕵️", age: "12+" },
    { time: "16:30", title: "Место происшествия", desc: "Криминальная хроника", icon: "🚨", age: "12+" },
    { time: "17:00", title: "Сейчас", desc: "Вечерний выпуск новостей", icon: "📰", age: "0+" },
    { time: "17:30", title: "Детективы", desc: "Российский детективный сериал", icon: "🕵️", age: "12+" },
    { time: "20:00", title: "Сейчас в 20:00", desc: "Главный вечерний выпуск новостей", icon: "🌆", age: "0+" },
    { time: "20:30", title: "Российский сериал", desc: "Вечерний сериал", icon: "🎞️", age: "12+" },
    { time: "22:30", title: "Место происшествия. О главном", desc: "Итоговая криминальная хроника", icon: "🚓", age: "16+" },
    { time: "23:00", title: "Сейчас", desc: "Ночной выпуск", icon: "🌙", age: "0+" },
  ],
  "РЕН ТВ": [
    { time: "05:00", title: "Добров в эфире", desc: "Ночное ток-шоу с Андреем Добровым", icon: "🌙", age: "16+" },
    { time: "07:00", title: "Экстренный вызов", desc: "Утренняя криминальная хроника", icon: "🚨", age: "16+" },
    { time: "08:00", title: "Новости 112", desc: "Утренние новости РЕН ТВ", icon: "📰", age: "0+" },
    { time: "09:00", title: "Документальный фильм", desc: "Тайны и загадки мироздания", icon: "🔮", age: "12+" },
    { time: "11:00", title: "Экстренный вызов", desc: "Дневная криминальная хроника", icon: "🚨", age: "16+" },
    { time: "12:00", title: "Информационная программа «112»", desc: "Дневной выпуск", icon: "📰", age: "0+" },
    { time: "13:00", title: "Засекреченные списки", desc: "Документальный цикл расследований", icon: "📋", age: "12+" },
    { time: "14:00", title: "Великие тайны", desc: "Документальные фильмы о загадках истории", icon: "🏺", age: "0+" },
    { time: "16:00", title: "Экстренный вызов", desc: "Вечерняя криминальная хроника", icon: "🚨", age: "16+" },
    { time: "17:00", title: "Новости 112", desc: "Вечерние новости", icon: "📰", age: "0+" },
    { time: "17:30", title: "Добров в эфире", desc: "Актуальное ток-шоу с Андреем Добровым", icon: "🎙️", age: "16+" },
    { time: "19:00", title: "Новости 112", desc: "Главный вечерний выпуск", icon: "🌆", age: "0+" },
    { time: "21:00", title: "Смотреть всем!", desc: "Остросюжетное ток-шоу", icon: "👁️", age: "16+" },
    { time: "23:00", title: "Новости 112", desc: "Ночной выпуск", icon: "🌙", age: "0+" },
  ],
  "СТС": [
    { time: "06:00", title: "Три кота", desc: "Мультсериал для детей 0+", icon: "🐱", age: "0+" },
    { time: "06:30", title: "Барбоскины", desc: "Семейный мультсериал 0+", icon: "🐕", age: "0+" },
    { time: "07:00", title: "Турбозавры", desc: "Детский мультсериал", icon: "🦕", age: "0+" },
    { time: "07:30", title: "Смешарики", desc: "Знаменитый отечественный мультсериал", icon: "⭕", age: "0+" },
    { time: "08:00", title: "Кухня", desc: "Популярная комедийная серия о ресторане", icon: "👨‍🍳", age: "12+" },
    { time: "10:00", title: "Воронины", desc: "Семейная комедия о большой семье", icon: "👨‍👩‍👧‍👦", age: "0+" },
    { time: "12:00", title: "СТС Love", desc: "Романтические истории", icon: "💕", age: "12+" },
    { time: "14:00", title: "Молодёжка", desc: "Сериал о хоккейной команде", icon: "🏒", age: "12+" },
    { time: "16:00", title: "Кухня", desc: "Комедийный сериал", icon: "👨‍🍳", age: "12+" },
    { time: "18:00", title: "Воронины", desc: "Семейная комедия", icon: "👨‍👩‍👧‍👦", age: "0+" },
    { time: "20:00", title: "Этот вечер. СТС", desc: "Вечерний блок программ", icon: "🌇", age: "12+" },
    { time: "21:00", title: "Премьерный сериал", desc: "Новый сезон на СТС", icon: "🎬", age: "12+" },
    { time: "23:00", title: "Кино на СТС", desc: "Художественный фильм", icon: "🎥", age: "16+" },
  ],
  "ТНТ": [
    { time: "06:00", title: "Счастливы вместе", desc: "Комедийный сериал о семье Букиных", icon: "😄", age: "16+" },
    { time: "07:00", title: "Универ", desc: "Молодёжный комедийный сериал", icon: "🎓", age: "16+" },
    { time: "09:00", title: "Универ. Новая общага", desc: "Продолжение популярного сериала", icon: "🏠", age: "16+" },
    { time: "10:30", title: "САШАТАНЯ", desc: "Семейная комедия о молодожёнах", icon: "💑", age: "12+" },
    { time: "12:00", title: "Дом-2. Lite", desc: "Реалити-шоу о любви и отношениях", icon: "❤️", age: "16+" },
    { time: "13:00", title: "Интерны", desc: "Комедийный сериал о врачах", icon: "🏥", age: "16+" },
    { time: "14:00", title: "Реальные пацаны", desc: "Комедийный сериал о жизни в Перми", icon: "👊", age: "16+" },
    { time: "15:30", title: "Физрук", desc: "Комедийный сериал с Нагиевым", icon: "💪", age: "16+" },
    { time: "17:00", title: "Полицейский с Рублёвки", desc: "Комедийный сериал о полицейском", icon: "🚔", age: "16+" },
    { time: "18:30", title: "Дом-2. Город любви", desc: "Реалити-шоу — прямой эфир", icon: "🏡", age: "16+" },
    { time: "20:00", title: "Большое кино", desc: "Голливудский блокбастер вечера", icon: "🎬", age: "12+" },
    { time: "21:30", title: "Иванько", desc: "Хитовый комедийный сериал ТНТ", icon: "😂", age: "16+" },
    { time: "23:00", title: "Stand Up", desc: "Вечер юмора на ТНТ", icon: "🎤", age: "18+" },
  ],
  "Культура": [
    { time: "06:30", title: "Сигнал точного времени", desc: "", icon: "⏰", age: "0+" },
    { time: "07:00", title: "Новости культуры", desc: "Культурная жизнь России и мира", icon: "🎭", age: "0+" },
    { time: "07:35", title: "Пешком…", desc: "Документальный цикл о городах России", icon: "🚶", age: "0+" },
    { time: "08:00", title: "Большая опера", desc: "Оперные постановки ведущих театров", icon: "🎼", age: "0+" },
    { time: "10:00", title: "Новости культуры", desc: "Культурная жизнь России и мира", icon: "🎭", age: "0+" },
    { time: "10:15", title: "Документальный фильм", desc: "Познавательный фильм о культуре", icon: "📽️", age: "0+" },
    { time: "11:30", title: "Библейский сюжет", desc: "Христианская культура в искусстве", icon: "✝️", age: "0+" },
    { time: "12:00", title: "Новости культуры", desc: "Дневной выпуск", icon: "🎭", age: "0+" },
    { time: "12:15", title: "Линия жизни", desc: "Беседы с выдающимися людьми", icon: "🎙️", age: "0+" },
    { time: "13:10", title: "Балет", desc: "Трансляция из Большого театра", icon: "🩰", age: "0+" },
    { time: "15:00", title: "Новости культуры", desc: "Дневной выпуск", icon: "🎭", age: "0+" },
    { time: "16:00", title: "Абсолютный слух", desc: "Программа о классической музыке", icon: "🎵", age: "0+" },
    { time: "17:00", title: "Мировые сокровища культуры", desc: "Шедевры мировой живописи", icon: "🖼️", age: "0+" },
    { time: "18:00", title: "Новости культуры", desc: "Вечерний выпуск", icon: "🌆", age: "0+" },
    { time: "18:15", title: "Спокойной ночи, малыши!", desc: "Легендарная детская передача с 1964 года", icon: "🌙", age: "0+" },
    { time: "18:30", title: "Главная роль", desc: "Беседы с мастерами театра и кино", icon: "🎭", age: "0+" },
    { time: "19:30", title: "Черные дыры. Белые пятна", desc: "Научно-познавательная программа", icon: "🌌", age: "0+" },
    { time: "20:10", title: "Правила жизни", desc: "Документальный цикл", icon: "📖", age: "0+" },
    { time: "20:30", title: "Новости культуры", desc: "Вечерний выпуск", icon: "🎭", age: "0+" },
    { time: "20:45", title: "Концерт", desc: "Вечер классической музыки", icon: "🎻", age: "0+" },
    { time: "23:00", title: "Искусственный отбор", desc: "Программа о современном искусстве", icon: "🎨", age: "0+" },
  ],
  "Матч ТВ": [
    { time: "06:00", title: "Все на Матч!", desc: "Утреннее спортивное ток-шоу", icon: "☀️", age: "0+" },
    { time: "08:00", title: "Специальный репортаж", desc: "Спортивные расследования и документалки", icon: "📋", age: "0+" },
    { time: "09:00", title: "Формула 1. Практика", desc: "Тренировочные заезды Гран-При", icon: "🏎️", age: "0+" },
    { time: "11:00", title: "Футбол. ЦСКА — Зенит", desc: "Чемпионат России. Прямая трансляция", icon: "⚽", age: "0+" },
    { time: "13:00", title: "Все на Матч!", desc: "Дневное спортивное ток-шоу", icon: "🎤", age: "0+" },
    { time: "14:00", title: "Хоккей. КХЛ", desc: "Прямая трансляция матча КХЛ", icon: "🏒", age: "0+" },
    { time: "17:00", title: "Теннис. Roland Garros", desc: "Открытый чемпионат Франции. Прямой эфир", icon: "🎾", age: "0+" },
    { time: "19:00", title: "Футбол. Лига чемпионов", desc: "1/4 финала. Прямая трансляция UEFA", icon: "🏆", age: "0+" },
    { time: "21:30", title: "Все на Матч!", desc: "Вечернее спортивное ток-шоу. Итоги дня", icon: "🌆", age: "0+" },
    { time: "22:30", title: "Бокс. Вечер чемпионов", desc: "Чемпионский бой. Прямая трансляция", icon: "🥊", age: "12+" },
  ],
  "Карусель": [
    { time: "01:00", title: "Приключения Пети и Волка", desc: "Анимационный сериал 12+ · Дело о Нечаянном проклятии — Дело о Тараканах", icon: "🐺", age: "12+" },
    { time: "02:30", title: "Маша и Медведь", desc: "Любимый мультсериал 0+ · Кушать подано! — Чудо в перьях — Спасайся кто может!", icon: "🐻", age: "0+" },
    { time: "04:00", title: "Маша и Медведь. Песенки для малышей", desc: "Музыкальные серии 0+ · Бинго", icon: "🎵", age: "0+" },
    { time: "04:05", title: "Маша и Медведь", desc: "0+ · Дочки-матери — Унесённый ветром — Впервые на арене — Вот так штука!", icon: "🐻", age: "0+" },
    { time: "05:00", title: "Лунтик", desc: "Добрый мультсериал для малышей 0+ · Туземцы — Тема для поэмы — Потоп — Ленивый жучок", icon: "🌙", age: "0+" },
    { time: "07:00", title: "С добрым утром, малыши!", desc: "Утренняя программа 0+ — Герои «Спокойной ночи, малыши!» будят каждого ребёнка в детский сад", icon: "🌅", age: "0+" },
    { time: "07:25", title: "Погода", desc: "Актуальный прогноз погоды от ведущих «Спокойной ночи, малыши!»", icon: "🌤️", age: "0+" },
    { time: "07:30", title: "Ум и Хрум", desc: "Российский мультсериал 0+ · Рыцарь — Пахучий случай — Чёрная дыра — Строитель — Хрумолёт", icon: "🧠", age: "0+" },
    { time: "10:45", title: "Студия Каляки-Маляки", desc: "Детская творческая программа 0+ · Оркестр кактусов", icon: "🎨", age: "0+" },
    { time: "11:10", title: "Буба", desc: "Анимационный сериал 6+ · Кухня — Ванная комната — Детская комната — Кабинет", icon: "🎪", age: "6+" },
    { time: "13:45", title: "Инфинити Надо", desc: "Анимационный сериал 6+ · Принц Гарольд — Самый сильный в клане Огня", icon: "🔥", age: "6+" },
    { time: "14:15", title: "Минифорс. Сила динозавров", desc: "Анимационный сериал 6+ · Решающее сражение", icon: "🦕", age: "6+" },
    { time: "14:30", title: "Навигатор. У нас гости!", desc: "Еженедельное приложение к программе «Навигатор. Новости»", icon: "🧭", age: "0+" },
    { time: "14:35", title: "Погода", desc: "Актуальный прогноз погоды", icon: "🌤️", age: "0+" },
    { time: "14:40", title: "Фиксики. Дай пять!", desc: "Познавательный мультсериал 0+ · Лошадиные силы — Принцесса — Марсоход — Бабочка — Рыцарь", icon: "🔧", age: "0+" },
    { time: "17:30", title: "Лео и Тиг", desc: "Природоведческий мультсериал 0+ · Шкура солнца — Таинственная пещера — Таёжная сказка", icon: "🐯", age: "0+" },
    { time: "21:00", title: "Спокойной ночи, малыши!", desc: "Легендарная передача с 1964 года 0+", icon: "🌙", age: "0+" },
    { time: "21:15", title: "Маша и Медведь", desc: "0+ · Колесо дружбы — Три пятачка — Вишенка на торте — Что ты ешь?", icon: "🐻", age: "0+" },
    { time: "23:00", title: "Дикие Скричеры!", desc: "Анимационный сериал 6+ · Иллюзия финала", icon: "😱", age: "6+" },
    { time: "23:15", title: "Приключения Пети и Волка", desc: "12+ · Дело Рыб и их будущего — Дело о Невидимках — Дело о Прирождённом победителе", icon: "🐺", age: "12+" },
  ],
};

type Section = "home" | "tv" | "cartoons" | "schedule";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [selectedEpisode, setSelectedEpisode] = useState<{ ep: number; title: string; videoId: string } | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<typeof TV_CHANNELS[0] | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<1 | 2>(1);
  const [scheduleChannel, setScheduleChannel] = useState("Первый канал");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const navItems: { id: Section; label: string; icon: string }[] = [
    { id: "home", label: "Главная", icon: "Home" },
    { id: "tv", label: "ТВ-каналы", icon: "Tv" },
    { id: "cartoons", label: "Мультсериалы", icon: "Film" },
    { id: "schedule", label: "Программа передач", icon: "CalendarDays" },
  ];

  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotal = currentHour * 60 + currentMinute;

  return (
    <div className="min-h-screen bg-background text-foreground font-golos">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <button
            onClick={() => setActiveSection("home")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded-xl neon-glow flex items-center justify-center font-montserrat font-black text-white text-base"
              style={{ background: "linear-gradient(135deg, #ff5c1a, #a855f7)" }}
            >
              П
            </div>
            <span className="font-montserrat font-bold text-xl text-white hidden sm:block">Поехали</span>
            <span className="text-xs text-orange-400 hidden sm:block font-semibold">TV</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-orange-500/15 text-orange-400 border border-orange-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon as IconName} size={16} />
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass border-t border-white/5 p-4 flex flex-col gap-2 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? "bg-orange-500/15 text-orange-400"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon name={item.icon as IconName} size={18} />
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <div className="pt-16">
        {/* ===== HOME ===== */}
        {activeSection === "home" && (
          <div className="animate-fade-in">
            <div className="relative h-[70vh] min-h-[420px] overflow-hidden">
              <img src={HERO_IMG} alt="Кинотеатр Поехали" className="absolute inset-0 w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(10,5,20,0.95) 30%, rgba(10,5,20,0.5) 70%, rgba(10,5,20,0.2) 100%), linear-gradient(to top, rgba(10,5,20,1) 0%, transparent 60%)" }}
              />
              <div className="relative z-10 h-full flex flex-col justify-end px-6 sm:px-12 pb-12 max-w-3xl">
                <div className="inline-flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse-glow" />
                  <span className="text-orange-400 text-sm font-medium uppercase tracking-widest">Онлайн Кинотеатр</span>
                </div>
                <h1 className="font-montserrat font-black text-4xl sm:text-6xl text-white leading-tight mb-4">
                  Смотри всё,{" "}
                  <span className="gradient-text">что любишь</span>
                </h1>
                <p className="text-gray-300 text-lg mb-8 max-w-xl">
                  Мультсериалы, ТВ-каналы, программа передач — всё в одном месте. Бесплатно.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveSection("cartoons")}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat font-bold text-white text-sm transition-all hover:scale-105 neon-glow"
                    style={{ background: "linear-gradient(135deg, #ff5c1a, #ff8c42)" }}
                  >
                    <Icon name="Play" size={18} />
                    Смотреть мультсериалы
                  </button>
                  <button
                    onClick={() => setActiveSection("tv")}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-montserrat font-bold text-white text-sm glass hover:bg-white/10 transition-all hover:scale-105"
                  >
                    <Icon name="Tv" size={18} />
                    ТВ-каналы
                  </button>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
              <h2 className="font-montserrat font-bold text-2xl text-white mb-6">Разделы</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: "tv" as Section, title: "ТВ-каналы", desc: "11 федеральных каналов", icon: "Tv", grad: "from-blue-600 to-blue-400", count: "11 каналов" },
                  { id: "cartoons" as Section, title: "Мультсериалы", desc: "Геройчики, Ум и Хрум", icon: "Film", grad: "from-orange-600 to-pink-500", count: "2 сериала" },
                  { id: "schedule" as Section, title: "Программа передач", desc: "Расписание на сегодня", icon: "CalendarDays", grad: "from-purple-600 to-indigo-500", count: "Все каналы" },
                ].map((card) => (
                  <button
                    key={card.id}
                    onClick={() => setActiveSection(card.id)}
                    className="card-glow rounded-2xl p-6 text-left group transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.grad} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon name={card.icon as IconName} size={22} className="text-white" />
                    </div>
                    <h3 className="font-montserrat font-bold text-white text-lg mb-1">{card.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">{card.desc}</p>
                    <span className="text-xs text-orange-400 font-medium">{card.count} →</span>
                  </button>
                ))}
              </div>

              <div className="mt-12">
                <h2 className="font-montserrat font-bold text-2xl text-white mb-6">Сейчас популярно</h2>
                <div
                  className="relative rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setActiveSection("cartoons")}
                  style={{ background: "linear-gradient(135deg, #1a0a2e, #2d0a1a)" }}
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-64 h-44 sm:h-auto relative overflow-hidden flex-shrink-0">
                      <img src={GEROI_IMG} alt="Геройчики" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#1a0a2e] hidden sm:block" />
                    </div>
                    <div className="p-6 sm:pl-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">0+</span>
                        <span className="text-gray-400 text-sm">2022–2023 · 2 сезона · 26 серий</span>
                      </div>
                      <h3 className="font-montserrat font-black text-white text-2xl sm:text-3xl mb-3">Геройчики</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-4 max-w-xl">
                        Мальчик Рома очень любит играть. В его комнате полно игрушек: инопланетянин Бублик, петух Ко-Ко, ящерица О-Раш, куколка Пинки и отважные супергерои Флай и Глория!
                      </p>
                      <div className="flex items-center gap-2 text-orange-400 font-medium text-sm group-hover:gap-3 transition-all">
                        <Icon name="Play" size={16} />
                        Смотреть сериал
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===== TV ===== */}
        {activeSection === "tv" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

            {/* TV Player Modal */}
            {selectedChannel && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(16px)" }}
                onClick={(e) => { if (e.target === e.currentTarget) setSelectedChannel(null); }}
              >
                <div className="w-full max-w-4xl animate-scale-in">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: `${selectedChannel.color}33`, border: `1px solid ${selectedChannel.color}55` }}
                      >
                        {selectedChannel.emoji}
                      </div>
                      <div>
                        <h3 className="font-montserrat font-bold text-white text-xl">{selectedChannel.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-red-400 text-xs font-medium">ПРЯМОЙ ЭФИР</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedChannel(null)}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>
                  <div className="rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
                    {selectedChannel.stream
                      ? <HlsPlayer key={selectedChannel.id} src={selectedChannel.stream} className="w-full h-full" />
                      : (
                        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                          <Icon name="Tv" size={48} className="text-gray-600" />
                          <p className="text-gray-500 text-sm">Трансляция для этого канала скоро появится</p>
                        </div>
                      )
                    }
                  </div>
                  {/* Переключение каналов */}
                  <div className="flex gap-2 mt-4 overflow-x-auto scrollbar-hide pb-1">
                    {TV_CHANNELS.filter(c => c.stream).map(ch => (
                      <button
                        key={ch.id}
                        onClick={() => setSelectedChannel(ch)}
                        className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                          selectedChannel.id === ch.id
                            ? "text-white"
                            : "glass text-gray-400 hover:text-white"
                        }`}
                        style={selectedChannel.id === ch.id ? { background: `${ch.color}44`, border: `1px solid ${ch.color}66` } : {}}
                      >
                        <span>{ch.emoji}</span>
                        <span className="font-medium">{ch.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #ff5c1a, #a855f7)" }} />
                <h1 className="font-montserrat font-black text-3xl text-white">ТВ-каналы</h1>
              </div>
              <p className="text-gray-400 ml-4">Федеральные каналы России · Прямой эфир</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TV_CHANNELS.map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch)}
                  className="channel-card card-glow rounded-2xl p-5 flex items-center gap-4 cursor-pointer relative overflow-hidden group"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{ background: `${ch.color}22`, border: `1px solid ${ch.color}44` }}
                  >
                    {ch.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-montserrat font-bold text-white text-base mb-0.5">{ch.name}</h3>
                    <p className="text-gray-500 text-xs truncate">{ch.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {ch.stream
                      ? <><span className="w-1.5 h-1.5 rounded-full bg-green-400 live-badge" /><span className="text-green-400 text-xs font-medium">LIVE</span></>
                      : <span className="text-gray-600 text-xs">Скоро</span>
                    }
                  </div>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center neon-glow">
                        <Icon name="Play" size={20} className="text-white ml-1" />
                      </div>
                      <span className="text-white text-sm font-medium">{ch.stream ? "Смотреть" : "Скоро"}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 rounded-2xl glass border border-orange-500/10">
              <div className="flex items-start gap-3">
                <Icon name="Info" size={18} className="text-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm">
                  Матч ТВ и ОТР — трансляции появятся позже. Также можно посмотреть{" "}
                  <button onClick={() => setActiveSection("schedule")} className="text-orange-400 hover:text-orange-300 underline">
                    программу передач
                  </button>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ===== CARTOONS ===== */}
        {activeSection === "cartoons" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #ff5c1a, #ec4899)" }} />
                <h1 className="font-montserrat font-black text-3xl text-white">Мультсериалы</h1>
              </div>
            </div>

            {/* Video modal */}
            {selectedEpisode && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)" }}
                onClick={(e) => { if (e.target === e.currentTarget) setSelectedEpisode(null); }}
              >
                <div className="w-full max-w-4xl animate-scale-in">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-gray-400 text-sm mb-1">Геройчики · Серия {selectedEpisode.ep}</div>
                      <h3 className="font-montserrat font-bold text-white text-xl">{selectedEpisode.title}</h3>
                    </div>
                    <button
                      onClick={() => setSelectedEpisode(null)}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                    >
                      <Icon name="X" size={20} />
                    </button>
                  </div>

                  {/* VK embed плеер */}
                  <div className="rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
                    <iframe
                      key={selectedEpisode.videoId}
                      src={vkEmbed(selectedEpisode.videoId)}
                      className="w-full h-full"
                      allowFullScreen
                      allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={selectedEpisode.title}
                    />
                  </div>

                  {/* Навигация */}
                  <div className="flex items-center justify-between mt-4">
                    <button
                      disabled={selectedEpisode.ep <= 1}
                      onClick={() => setSelectedEpisode(GEROI_SEASON1[selectedEpisode.ep - 2])}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <Icon name="ChevronLeft" size={16} />
                      Предыдущая
                    </button>
                    <span className="text-gray-600 text-sm">{selectedEpisode.ep} / {GEROI_SEASON1.length}</span>
                    <button
                      disabled={selectedEpisode.ep >= GEROI_SEASON1.length}
                      onClick={() => setSelectedEpisode(GEROI_SEASON1[selectedEpisode.ep])}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      Следующая
                      <Icon name="ChevronRight" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Геройчики card */}
            <div className="mb-10">
              <div
                className="flex flex-col sm:flex-row gap-0 mb-8 rounded-2xl overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(255,92,26,0.08), rgba(168,85,247,0.05))", border: "1px solid rgba(255,92,26,0.15)" }}
              >
                <div className="sm:w-48 flex-shrink-0">
                  <img src={GEROI_IMG} alt="Геройчики" className="w-full h-48 sm:h-full object-cover" />
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">0+</span>
                    <span className="text-gray-400 text-sm">2022–2023 · 2 сезона · 26 серий</span>
                  </div>
                  <h2 className="font-montserrat font-black text-2xl text-white mb-3">Геройчики</h2>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Мальчик Рома очень любит играть, поэтому в его комнате полным-полно разных игрушек. Кого здесь только нет: и загадочный пушистый инопланетянин Бублик, и отважный петух-тянучка Ко-Ко, и благородная ящерица-самурай О-Раш, и милая куколка Пинки, и воинственный плюшевый заяц Генерал Де-Кроль со своими роботами, и отважные супергерои Флай и Глория.
                  </p>
                </div>
              </div>

              {/* Season tabs */}
              <div className="flex gap-2 mb-6">
                {([1, 2] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSeason(s)}
                    className={`px-5 py-2.5 rounded-xl font-montserrat font-bold text-sm transition-all ${
                      selectedSeason === s ? "text-white neon-glow" : "glass text-gray-400 hover:text-white"
                    }`}
                    style={selectedSeason === s ? { background: "linear-gradient(135deg, #ff5c1a, #a855f7)" } : {}}
                  >
                    Сезон {s}
                  </button>
                ))}
              </div>

              {selectedSeason === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {GEROI_SEASON1.map((ep) => (
                    <button
                      key={ep.ep}
                      onClick={() => setSelectedEpisode(ep)}
                      className="card-glow rounded-xl p-4 text-left flex items-center gap-3 group"
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                        style={{ background: "linear-gradient(135deg, rgba(255,92,26,0.2), rgba(168,85,247,0.15))", border: "1px solid rgba(255,92,26,0.25)" }}
                      >
                        <span className="text-orange-400 text-sm font-bold font-montserrat">{ep.ep}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-gray-500 text-xs mb-0.5">Серия {ep.ep}</div>
                        <div className="text-white text-sm font-medium truncate group-hover:text-orange-300 transition-colors">{ep.title}</div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                          <Icon name="Play" size={14} className="text-white ml-0.5" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {selectedSeason === 2 && (
                <div className="rounded-2xl glass p-8 text-center border border-purple-500/15">
                  <div className="text-5xl mb-4">🚀</div>
                  <h3 className="font-montserrat font-bold text-white text-xl mb-2">Сезон 2 скоро появится</h3>
                  <p className="text-gray-400 text-sm">Названия серий 2-го сезона будут добавлены позже</p>
                </div>
              )}
            </div>

            {/* Ум и Хрум */}
            <div className="card-glow rounded-2xl p-6 flex items-center gap-4">
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.15))", border: "1px solid rgba(168,85,247,0.25)" }}
              >
                🧠
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-0.5 rounded-full border border-purple-500/30">0+</span>
                  <span className="text-gray-500 text-xs">Скоро</span>
                </div>
                <h3 className="font-montserrat font-bold text-white text-xl mb-1">Ум и Хрум</h3>
                <p className="text-gray-500 text-sm">Описание и серии появятся позже</p>
              </div>
              <div className="glass rounded-xl px-4 py-2 text-sm text-gray-400 flex items-center gap-2 flex-shrink-0">
                <Icon name="Clock" size={14} />
                Скоро
              </div>
            </div>
          </div>
        )}

        {/* ===== SCHEDULE ===== */}
        {activeSection === "schedule" && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">

            {/* Header + живые часы */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-1 h-8 rounded-full" style={{ background: "linear-gradient(to bottom, #a855f7, #3b82f6)" }} />
                  <h1 className="font-montserrat font-black text-3xl text-white">Программа передач</h1>
                </div>
                <p className="text-gray-400 ml-4 text-sm capitalize">
                  {now.toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" })}
                </p>
              </div>
              {/* Живые часы */}
              <div className="ml-4 sm:ml-0 rounded-2xl px-6 py-3 text-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(59,130,246,0.15))", border: "1px solid rgba(168,85,247,0.25)" }}>
                <div className="text-gray-400 text-xs mb-0.5">Сейчас</div>
                <div className="font-montserrat font-black text-white text-3xl tabular-nums tracking-tight">
                  {String(now.getHours()).padStart(2, "0")}:{String(now.getMinutes()).padStart(2, "0")}
                  <span className="text-purple-400 text-xl">:{String(now.getSeconds()).padStart(2, "0")}</span>
                </div>
                <div className="text-gray-500 text-xs mt-0.5">Москва</div>
              </div>
            </div>

            {/* Channel tabs */}
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-3 mb-6">
              {Object.keys(TV_SCHEDULE).map((ch) => {
                const chData = TV_CHANNELS.find(c => c.name === ch);
                return (
                  <button
                    key={ch}
                    onClick={() => setScheduleChannel(ch)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                      scheduleChannel === ch ? "text-white" : "glass text-gray-400 hover:text-white"
                    }`}
                    style={scheduleChannel === ch ? { background: "linear-gradient(135deg, #7c3aed, #a855f7)", boxShadow: "0 0 16px rgba(168,85,247,0.4)" } : {}}
                  >
                    {chData && <span>{chData.emoji}</span>}
                    {ch}
                  </button>
                );
              })}
            </div>

            {/* Список передач */}
            <div className="space-y-2">
              {TV_SCHEDULE[scheduleChannel]?.map((item, i) => {
                const [h, m] = item.time.split(":").map(Number);
                const itemTotal = h * 60 + m;
                const nextItem = TV_SCHEDULE[scheduleChannel][i + 1];
                const [nh, nm] = nextItem ? nextItem.time.split(":").map(Number) : [24, 0];
                const nextTotal = nh * 60 + nm;
                const isNow = currentTotal >= itemTotal && currentTotal < nextTotal;
                const isPast = currentTotal >= nextTotal;

                return (
                  <div
                    key={i}
                    className={`flex items-start gap-4 p-4 rounded-2xl transition-all ${isPast && !isNow ? "opacity-50" : ""}`}
                    style={isNow
                      ? { background: "linear-gradient(135deg, rgba(34,197,94,0.12), rgba(34,197,94,0.06))", border: "1px solid rgba(34,197,94,0.35)", boxShadow: "0 0 20px rgba(34,197,94,0.15)" }
                      : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }
                    }
                  >
                    {/* Время */}
                    <div className="w-14 flex-shrink-0 pt-0.5">
                      <span className={`font-montserrat font-bold text-base tabular-nums ${isNow ? "text-green-400" : isPast ? "text-gray-600" : "text-gray-300"}`}>
                        {item.time}
                      </span>
                    </div>

                    {/* Иконка */}
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={isNow
                        ? { background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.3)" }
                        : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }
                      }
                    >
                      {item.icon}
                    </div>

                    {/* Контент */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className={`font-montserrat font-bold text-sm sm:text-base ${isNow ? "text-white" : isPast ? "text-gray-500" : "text-gray-100"}`}>
                          {item.title}
                        </span>
                        <span className="text-gray-600 text-xs border border-gray-700 px-1.5 py-0.5 rounded">{item.age}</span>
                        {isNow && (
                          <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full"
                            style={{ background: "rgba(34,197,94,0.2)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.4)" }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            СЕЙЧАС В ЭФИРЕ
                          </span>
                        )}
                      </div>
                      {item.desc && (
                        <p className={`text-xs leading-relaxed line-clamp-2 ${isNow ? "text-gray-300" : "text-gray-600"}`}>
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-8 mt-8 border-t border-white/5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-sm font-montserrat font-black text-white"
                style={{ background: "linear-gradient(135deg, #ff5c1a, #a855f7)" }}
              >
                П
              </div>
              <span className="text-gray-400 text-sm">Поехали TV — бесплатный онлайн кинотеатр</span>
            </div>
            <span className="text-gray-600 text-xs">© 2024 Поехали</span>
          </div>
        </footer>
      </div>
    </div>
  );
}