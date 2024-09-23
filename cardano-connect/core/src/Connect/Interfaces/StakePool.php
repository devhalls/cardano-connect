<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Responses\ResponsePool;
use WPCC\Connect\Responses\ResponsePools;

interface StakePool {
	public function getStakePools(int $page = 1, int $count = 10, array|null $filters = null): ResponsePools;

	public function getStakePool(string $pool_id): ResponsePool;
}