/**
 * 假设有4个物品，重量分别为 5，4，7，2；价值分别为3，4，5，8
 * 现有背包容量为8
 *
 * 问：怎么装才能实现背包价值最大？
 */
var item_w_list = [5, 4, 7, 2];
var item_v_list = [3, 4, 5, 8];
/**
 * 在容量为bag_room的背包中，获取前item_count个物品，的最大价值
 */
function bagFn(item_count, bag_room) {
  if (bag_room <= 0 || item_count < 1) return 0;
  var item_index = item_count - 1;

  var last_item_weight = item_w_list[item_index];
  if (last_item_weight > bag_room) {
    // 放不下时
    return bagFn(item_count - 1, bag_room);
  } else {
    //放
    var v1 =
      bagFn(item_count - 1, bag_room - last_item_weight) +
      item_v_list[item_index];
    //不放
    var v2 = bagFn(item_count - 1, bag_room);
    return Math.max(v1, v2);
  }
}

var result = bagFn(4, 8);
console.log(result);

/**
 * 优化
 */
var cache = {};
function bagFnCache(item_count, bag_room) {
  if (bag_room <= 0 || item_count < 1) return 0;
  var item_index = item_count - 1;

  var last_item_weight = item_w_list[item_index];
  if (last_item_weight > bag_room) {
    // 放不下时
    if (!cache[`${item_count - 1}_${bag_room}`]) {
      cache[`${item_count - 1}_${bag_room}`] = bagFn(item_count - 1, bag_room);
    }
    return cache[`${item_count - 1}_${bag_room}`];
  } else {
    //放
    var v1;
    if (!cache[`${item_count - 1}_${bag_room - last_item_weight}`]) {
      cache[`${item_count - 1}_${bag_room - last_item_weight}`] =
        bagFn(item_count - 1, bag_room - last_item_weight) +
        item_v_list[item_index];
    }
    v1 = cache[`${item_count - 1}_${bag_room - last_item_weight}`];
    //不放
    var v2;
    if (!cache[`${item_count - 1}_${bag_room}`]) {
      cache[`${item_count - 1}_${bag_room}`] = bagFn(item_count - 1, bag_room);
    }
    v2 = cache[`${item_count - 1}_${bag_room}`];
    return Math.max(v1, v2);
  }
}

var result = bagFnCache(4, 8);
console.log(result);
