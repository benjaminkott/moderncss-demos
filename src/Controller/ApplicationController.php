<?php

declare(strict_types=1);

/*
 * This file is part of the package bk2k/modern-css-demos.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace App\Controller;

use App\Service\BaselineService;
use App\Service\DemoService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('', name: 'app_application_')]
class ApplicationController extends AbstractController
{
    private DemoService $demoService;
    private BaselineService $baselineService;

    public function __construct(
        DemoService $demoService,
        BaselineService $baselineService
    ) {
        $this->demoService = $demoService;
        $this->baselineService = $baselineService;
    }

    #[Route('', name: 'index')]
    public function index(): Response
    {
        return $this->render('application/index.html.twig', [
            'demos' => $this->demoService->getAll(),
            'baselineService' => $this->baselineService,
        ]);
    }
}
