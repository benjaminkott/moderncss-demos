<?php

if (PHP_SAPI !== 'cli') {
    die('This script supports command line usage only. Please check your command.');
}

$header = <<<EOF
This file is part of the package bk2k/modern-css-demos.
For the full copyright and license information, please read the
LICENSE file that was distributed with this source code.
EOF;

return (new PhpCsFixer\Config())
    ->setRiskyAllowed(true)
    ->setRules([
        '@Symfony' => true,
        'declare_strict_types' => true,
        'array_syntax' => ['syntax' => 'short'],
        'concat_space' => ['spacing' => 'one'],
        'general_phpdoc_annotation_remove' => [
            'annotations' => ['author']
        ],
        'header_comment' => [
            'header' => $header
        ],
        'no_extra_blank_lines' => true,
        'no_superfluous_phpdoc_tags' => false,
    ])
    ->setFinder(
        PhpCsFixer\Finder::create()
            ->in(['src'])
    );
