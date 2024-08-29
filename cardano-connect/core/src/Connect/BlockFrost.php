<?php

namespace WPCC\Connect;

class BlockFrost extends Base implements DataInterface
{
	protected function setHeaders(): array {
		return [
			'project_id' => $this->api_key
		];
	}

	public function getAsset(string $asset): Response
	{
		return $this->get('assets/' . $asset);
	}

	public function getStakeHistory(string $stake_address): Response
	{
		return $this->get('accounts/' . $stake_address . '/history');
	}
}