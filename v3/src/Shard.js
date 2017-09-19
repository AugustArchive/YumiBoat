const { ShardingManager } = require('discord.js');
const config = require('./lib/config.json');
const logger = require('./lib/logger.js');
const shard = new ShardingManager('./Yumi.js', {
  autoShard: true,
  token: config.api_keys.Discord
});

shard.spawn();

shard.on('launch', shard => logger.info(`[SHARD] Shard ${shard.id}/${shard.totalShards} is usable.`));