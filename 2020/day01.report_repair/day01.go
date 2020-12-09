package day01

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

const targetSum = 2020

func Two(input *challenge.Challenge) int {
	index := make(map[int]int)

	for _, n := range input.IntSlice() {
		if m, ok := index[n]; ok {
			return n * m
		}
		index[targetSum-n] = n
	}

	panic("no solution")
}

func Three(c *challenge.Challenge) int {
	entries := c.IntSlice()

	for i := range entries {
		for j := i + 1; j < len(entries)-1; j++ {
			for k := j + 1; k < len(entries); k++ {
				if entries[i]+entries[j]+entries[k] == targetSum {
					return entries[i] * entries[j] * entries[k]
				}
			}
		}
	}

	panic("no solution")
}

func Register(s command.Solutions) {
	s.Register(1, "a", Two)
	s.Register(1, "b", Three)
}
