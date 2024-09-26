<?php

namespace WPCC\Connect\DTO;

abstract class Base {
	/**
	 * Recursive toArray converting Post to assoc.
	 */
	protected function toArray(
		array|null $data = null
	): array {
		$array = $data ?: (array) $this;
		foreach ($array as $k => $a) {
			if (is_object($a)) {
				$array[ $k ] = $this->toArray((array) $a);
			} else {
				$array[ $k ] = $a;
			}
		}
		return $array;
	}

	/**
	 * Filter passed $data_arr by the $filter_keys.
	 */
	public static function filterKeys(array $data_arr, array $filter_keys): array {
		return array_filter($data_arr, static fn ($a) => in_array( $a, $filter_keys, true ), ARRAY_FILTER_USE_KEY);
	}
}