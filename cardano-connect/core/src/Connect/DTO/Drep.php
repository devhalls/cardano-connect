<?php
namespace WPCC\Connect\DTO;

class Drep extends Base {
	/** @var string[] */
	public const FILLABLE = [
		'drep_id',
		'hex',
		'amount',
		'active',
		'active_epoch',
		'has_script',
		'metadata',
	];
	public function __construct(
		/** @var string */
		public string $drep_id,
		/** @var string */
		public string $hex,
		/** @var string */
		public string $amount,
		/** @var bool */
		public bool $active,
		/** @var int|null */
		public int|null $active_epoch = null,
		/** @var bool|null */
		public bool|null $has_script,
		/** @var DrepMetadata|null */
		public DrepMetadata|null $metadata = null,
	) {}

	/**
	 * Build object from self::FILLABLE array.
	 * Returns string on error containing the error message.
	 */
	public static function fromArray(
		array $data_arr,
	): self|string {
		$data_arr = self::filterKeys($data_arr, self::FILLABLE);
		return '';
	}
}
