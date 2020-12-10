package day10

import (
	"sort"

	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
)

func distribution(input *challenge.Challenge) int {
	differences := map[int]int{
		1: 0,
		2: 0,
		3: 1,
	}

	adapters := input.IntSlice()
	sort.Ints(adapters)

	d := 0
	for _, n := range adapters {
		differences[n-d]++
		d = n
	}

	return differences[1] * differences[3]
}

func arrangements(input *challenge.Challenge) int {
	adapters := input.IntSlice()
	adapters = append(adapters, 0)
	sort.Ints(adapters)
	adapters = append(adapters, adapters[len(adapters)-1]+3)

	results := make([]int, len(adapters))
	results[0] = 1

	for i, n := range adapters {
		for j := i - 1; j >= i-3 && j >= 0; j-- {
			if n-adapters[j] <= 3 {
				results[i] += results[j]
			}
		}
	}

	return results[len(results)-1]
}

func Register(s command.Solutions) {
	s.Register(10, "a", distribution)
	s.Register(10, "b", arrangements)
}
