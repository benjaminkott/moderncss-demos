<?php

declare(strict_types=1);

/*
 * This file is part of the package bk2k/modern-css-demos.
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

namespace App\Controller;

use App\Form\DemoType;
use App\Service\DemoService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/demo", name="app_demo_")
 */
class DemoController extends AbstractController
{
    private DemoService $demoService;

    public function __construct(
        DemoService $demoService
    ) {
        $this->demoService = $demoService;
    }

    /**
     * @Route("/{identifier}", name="show")
     */
    public function show(Request $request, ?string $identifier): Response
    {
        $demo = $this->demoService->get($identifier);
        $form = $this->createForm(DemoType::class, $demo);
        $form->handleRequest($request);

        return $this->render('demo/show.html.twig', [
            'demo' => $demo,
            'form' => $form->createView(),
        ]);
    }
}
