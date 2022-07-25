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
    protected string $content;
    protected string $styles;
    protected array $images = [];

    public function setIdentifier(string $identifer): self
    {
        $this->identifer = $identifer;

        return $this;
    }

    public function getIdentifier(): string
    {
        return $this->identifer;
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

    public function render(): string
    {
        return '<demo-container content="' . htmlspecialchars($this->getContent()) . '" styles="' . htmlspecialchars($this->getStyles()) . '"></demo-container>';
    }

    public function __toString(): string
    {
        return $this->render();
    }
}
