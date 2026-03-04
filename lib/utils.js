import { MATCHES } from "../data/mock";
import { LEVELS } from "../data/constants";

// ===== マッチ関連ヘルパー =====

/**
 * IDでマッチを取得
 */
export const getMatchById = (id) => MATCHES.find((m) => m.id === id);

/**
 * 残り枠数を計算
 */
export const getSpotsLeft = (match) => match.maxPlayers - match.currentPlayers;

// ===== レベル関連ヘルパー =====

/**
 * レベルキーからレベル設定を取得
 */
export const getLevelConfig = (key) => LEVELS[key] || LEVELS.all;

// ===== フォーマット関連ヘルパー =====

/**
 * 価格をフォーマット（例: 1800 -> "¥1,800"）
 */
export const formatPrice = (price) => `¥${price.toLocaleString()}`;

/**
 * 日付をフォーマット（例: "2026-03-07", "土" -> "2026-03-07（土）"）
 */
export const formatDate = (date, dayLabel) => `${date}（${dayLabel}）`;

/**
 * 時間範囲をフォーマット（例: "19:00", "21:00" -> "19:00〜21:00"）
 */
export const formatTimeRange = (startTime, endTime) => `${startTime}〜${endTime}`;

/**
 * 参加人数をフォーマット（例: 7, 10 -> "7/10人"）
 */
export const formatPlayerCount = (current, max) => `${current}/${max}人`;
