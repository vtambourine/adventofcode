package day09

import (
	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

func twoSum(list []int, target int) bool {
	for i := 0; i < len(list)-1; i++ {
		for j := i + 1; j < len(list); j++ {
			if list[i]+list[j] == target {
				return true
			}
		}
	}
	return false
}

func FirstInvalidWithPreamble(c *challenge.Challenge, preamble int) int {
	index := make(map[int]bool)
	window := make([]int, preamble)

	for i, n := range c.IntSlice() {
		if i >= preamble {
			if !twoSum(window, n) {
				return n
			}

			delete(index, window[0])
		}

		window = append(window[1:], n)
		index[n] = true
	}

	panic("no solution")
}

func FirstInvalid(c *challenge.Challenge) int {
	return FirstInvalidWithPreamble(c, 25)
}

func WeaknessWithPreamble(c *challenge.Challenge, preamble int) int {
	slice := make([]int, 0)
	index := make(map[int]bool)
	window := make([]int, preamble)

	var (
		target int
	)

	for i, n := range c.IntSlice() {
		slice = append(slice, n)
		if i >= preamble {
			if !twoSum(window, n) {
				target = n
				break
			}

			delete(index, window[0])
		}

		window = append(window[1:], n)
		index[n] = true
	}

	sum := 0
	for k := 0; k < len(slice)-1; k++ {
		sum = 0
		for t := k; t < len(slice)-1; t++ {
			sum += slice[t]
			if sum == target {
				return minInRange(slice[k:t+1]) + maxInRange(slice[k:t+1])
			}

			if sum > target {
				break
			}
		}
	}

	panic("no solution")
}

func minInRange(slice []int) int {
	min := slice[0]
	for _, n := range slice[1:] {
		if n < min {
			min = n
		}
	}
	return min
}

func maxInRange(slice []int) (max int) {
	max = slice[0]
	for _, n := range slice[1:] {
		if n > max {
			max = n
		}
	}
	return
}

func Weakness(c *challenge.Challenge) int {
	return WeaknessWithPreamble(c, 25)
}

func Register(s command.Solutions) {
	s.Register(9, "a", FirstInvalid)
	s.Register(9, "b", Weakness)
}
