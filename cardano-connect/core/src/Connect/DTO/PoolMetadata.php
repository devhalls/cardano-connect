<?php
namespace WPCC\Connect\DTO;

class PoolMetadata extends Base {
	/** @var string[] */
	public const FILLABLE = [
		'url',
		'hash',
		'ticker',
		'name',
		'description',
		'homepage',
		'extended',
	];
	public function __construct(
		/** @var string|null */
		public string|null $url = null,
		/** @var string|null */
		public string|null $hash = null,
		/** @var string|null */
		public string|null $ticker = null,
		/** @var string|null */
		public string|null $name = null,
		/** @var string|null */
		public string|null $description = null,
		/** @var string|null */
		public string|null $homepage = null,
		/** @var string|null */
		public string|null $extended = null,
	) {}
}