# ARM: Advantage Reward Modeling for Long-Horizon Manipulation

ARM is a reward modeling framework for long-horizon robotic manipulation. Instead of estimating hard-to-define absolute progress, ARM learns relative advantage from lightweight tri-state supervision and uses the resulting gains to improve offline policy optimization.

This repository currently contains the project website assets, paper figures, and accompanying media for the ARM project.

Project page: https://aiming1998.github.io/ARM/

Current venue: CVPR 2026 Workshop GigaBrain Challenge Submission.

## Overview

Long-horizon robotic manipulation remains difficult for reinforcement learning because sparse rewards provide weak credit assignment signals, while dense progress rewards are expensive to build and often break down when behaviors include backtracking, recovery, or non-monotonic execution.

ARM addresses this reward engineering bottleneck by shifting the learning target from absolute progress to relative advantage:

- Progressive: the current interval advances the task.
- Regressive: the current interval moves the task backward.
- Stagnant: the current interval does not meaningfully change task progress.

These labels are substantially easier to annotate than dense scalar rewards and support both full demonstrations and fragmented DAgger-style data.

## Method

ARM consists of three connected stages:

1. Tri-state advantage labeling
   Human annotators assign Progressive, Regressive, or Stagnant labels instead of numeric progress values or brittle subtask boundaries.

2. Advantage reward modeling with historical context
   A MIMO temporal advantage model predicts advantage sequences from multimodal observations and robot state, then reconstructs globally consistent progress trajectories.

3. Advantage-Weighted Behavior Cloning
   The inferred interval gains are used to adaptively reweight action chunks, filtering suboptimal samples and improving offline long-horizon policy learning.

## Main Results

On a long-horizon towel-folding task, the paper reports the following downstream policy results:

| Model | Success Rate (%) | Task Throughput (Episodes/hr) | Folding Precision |
| --- | ---: | ---: | ---: |
| BC-Baseline (GR00T N1.5) | 62.1 | 18 | 2.2 |
| RA-BC (GR00T + SARM) | 78.5 | 24 | 2.7 |
| AW-BC (GR00T + ARM) | 99.4 | 32 | 3.6 |

Additional findings highlighted in the paper:

- ARM reaches 99.4% success rate on long-horizon towel folding.
- Human tri-state labeling improves throughput from 100 to 250 samples per 8-hour shift compared with a segmentation-style human baseline.
- Auto tri-state inference exceeds 2,000 samples per 8-hour shift on a single NVIDIA A100 GPU.
- MIMO parallel inference removes redundant sliding-window evaluation and yields about 5x speedup over SARM-style processing.

## Why ARM Matters

Compared with prior reward modeling pipelines, ARM is designed to:

- avoid strict monotonicity assumptions,
- remain robust to recovery and corrective maneuvers,
- reduce annotation burden,
- scale to fragmented datasets,
- improve policy quality with advantage-aware reweighting.

## Repository Contents

The current repository is organized around the project website and paper assets:

- [index.html](index.html): project webpage
- [styles.css](styles.css): webpage styling
- [script.js](script.js): webpage interactions
- [paper_source](paper_source): figures and paper-related visual assets
- [video](video): project video and poster assets
- [assets](assets): supporting visual resources
- [CVPR_Reward.pdf](CVPR_Reward.pdf): paper PDF included in this repository

## Citation

If you find ARM useful, please cite:

```bibtex
@inproceedings{mao2026arm,
  title     = {ARM: Advantage Reward Modeling for Long-Horizon Manipulation},
  author    = {Yiming Mao and Zixi Yu and Weixin Mao and Yinhao Li and
               Qirui Hu and Zihan Lan and Minzhao Zhu and Hua Chen},
   booktitle = {CVPR 2026 Workshop GigaBrain Challenge Submission},
  year      = {2026},
   url       = {https://aiming1998.github.io/ARM/}
}
```

## Notes

- This branch currently contains the paper, website, and media assets.
- Training or evaluation code is not included in the current repository snapshot.