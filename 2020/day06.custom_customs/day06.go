package day06

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
	"math/bits"
)

func AnyoneYes(c *challenge.Challenge) int {
	result := 0

	var bitmap uint
	for line := range c.Lines() {
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

func EveryoneYes(c *challenge.Challenge) int {
	result := 0

	var bitmap = ^uint(0)
	for line := range c.Lines() {
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
	s.Register(6, "a", AnyoneYes)
	s.Register(6, "b", EveryoneYes)
}
