<?php

namespace WPCC\Connect\Interfaces;

use WPCC\Connect\Responses\ResponseDrep;
use WPCC\Connect\Responses\ResponseDreps;

interface Drep {
	public function getDreps(int $page = 1, int $count = 10, array|null $filters = null): ResponseDreps;

	public function getDrep(string $drep_id): ResponseDrep;
}