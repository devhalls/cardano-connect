<?php
namespace WPCC\Connect\DTO;

class PoolItn extends Base {
	/** @var string[] */
	public const FILLABLE = [
		'owner',
		'witness',
	];
	public function __construct(
		/** @var string */
		public string $owner,
		/** @var string */
		public string $witness,
	) {}
}