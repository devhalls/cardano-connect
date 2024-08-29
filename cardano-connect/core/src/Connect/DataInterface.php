<?php

namespace WPCC\Connect;

interface DataInterface {
	public function getAsset(string $asset): Response;

	public function getStakeHistory(string $stake_address): Response;
}
