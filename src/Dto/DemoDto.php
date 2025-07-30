<?php

declare(strict_types=1);

/*
 * This file is part of the package bk2k/modern-css-demos.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace App\Dto;

class DemoDto
{
    protected string $identifer;
    protected string $name;
    protected int $sorting = 0;
    protected bool $new = false;
    protected array $features = [];
    protected string $content = '';
    protected string $styles = '';
    protected string $scripts = '';

    public function setIdentifier(string $identifer): self
    {
        $this->identifer = $identifer;

        return $this;
    }

    public function getIdentifier(): string
    {
        return $this->identifer;
    }

    public function setSorting(int $sorting): self
    {
        $this->sorting = $sorting;

        return $this;
    }

    public function getLabel(): string
    {
        $number = str_pad(
            (string) $this->getSorting(),
            3,
            (string) 0,
            STR_PAD_LEFT
        );

        return $number . ' - ' . $this->getName();
    }

    public function getSorting(): int
    {
        return $this->sorting;
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



    public function setFeatures(array $features): self
    {
        $this->features = $features;

        return $this;
    }

    public function getFeatures(): array
    {
        return $this->features;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

        return $this;
    }

    public function getContent(): string
    {
        return $this->content;
    }

    public function setStyles(string $styles): self
    {
        $this->styles = $styles;

        return $this;
    }

    public function getStyles(): string
    {
        return $this->styles;
    }

    public function setScripts(string $scripts): self
    {
        $this->scripts = $scripts;

        return $this;
    }

    public function getScripts(): string
    {
        return $this->scripts;
    }

    public function setNew(bool $new): self
    {
        $this->new = $new;

        return $this;
    }

    public function getNew(): bool
    {
        return $this->new;
    }
}
