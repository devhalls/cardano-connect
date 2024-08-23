<?php

namespace WPCC\Connect;

class BlockFrost extends Base
{
	protected function setHeaders(): array {
		return [
			'project_id' => $this->api_key
		];
	}

	public function getAsset(string $asset): array
	{
		return $this->get('assets/' . $asset);
	}
}