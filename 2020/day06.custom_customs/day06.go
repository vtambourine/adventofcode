package day06

import (
	"math/bits"

	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

func anyoneYes(input *challenge.Challenge) int {
	result := 0

	var bitmap uint
	for line := range input.Lines() {
		if line == "" {
			result += bits.OnesCount(bitmap)
			bitmap = 0
			continue
		}

		for _, answer := range line {
			bitmap |= 1 << (answer - 'a')
		}
	}

	return result + bits.OnesCount(bitmap)
}

func everyoneYes(input *challenge.Challenge) int {
	result := 0

	var bitmap = ^uint(0)
	for line := range input.Lines() {
		if line == "" {
			result += bits.OnesCount(bitmap)
			bitmap = ^uint(0)
			continue
		}

		var mask uint = 0
		for _, answer := range line {
			mask |= 1 << (answer - 'a')
		}

		bitmap &= mask
	}

	return result + bits.OnesCount(bitmap)
}

func Register(s command.Solutions) {
	s.Register(6, "a", anyoneYes)
	s.Register(6, "b", everyoneYes)
}
