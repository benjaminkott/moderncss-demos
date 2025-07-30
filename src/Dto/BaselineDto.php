<?php

declare(strict_types=1);

/*
 * This file is part of the package bk2k/modern-css-demos.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace App\Dto;

use DateTime;
use DateTimeInterface;

class BaselineDto
{
    protected string $identifier;
    protected string $name;
    protected ?string $mdn = null;
    protected ?DateTimeInterface $availableDate = null;

    public function setIdentifier(string $identifier): self
    {
        $this->identifier = $identifier;

        return $this;
    }

    public function getIdentifier(): string
    {
        return $this->identifier;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setMdn(?string $mdn): self
    {
        $this->mdn = $mdn;

        return $this;
    }

    public function getMdn(): ?string
    {
        return $this->mdn;
    }

    public function setAvailableDate(?DateTimeInterface $availableDate): self
    {
        $this->availableDate = $availableDate;

        return $this;
    }

    public function getAvailableDate(): ?DateTimeInterface
    {
        return $this->availableDate;
    }

    public function getStatus(): string
    {
        if ($this->availableDate === null) {
            return 'limited';
        }

        $now = new DateTime();
        $diff = $now->diff($this->availableDate);
        $monthsDiff = ($diff->y * 12) + $diff->m;

        if ($monthsDiff >= 30) {
            return 'widely';
        }

        return 'newly';
    }

    public function getStatusLabel(): string
    {
        switch ($this->getStatus()) {
            case 'newly':
                $year = $this->availableDate ? $this->availableDate->format('Y') : '';
                return 'Baseline ' . $year;
            case 'widely':
                return 'Baseline widely available';
            case 'limited':
            default:
                return 'Limited availability';
        }
    }
}
