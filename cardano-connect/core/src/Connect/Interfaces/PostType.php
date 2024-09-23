<?php

namespace WPCC\Connect\Interfaces;

interface PostType {
	public function getName(): string;

	public function getConfig(): array;
}