package day05

import (
	"sort"

	"github.com/vtambourine/adventofcode/2020/challenge"
	"github.com/vtambourine/adventofcode/2020/command"
	"github.com/vtambourine/adventofcode/2020/util"
)

func highestSeat(input *challenge.Challenge) int {
	max := 0
	for line := range input.Lines() {
		pass := parsePass(line)
		max = util.MaxInt(max, pass.id)
	}
	return max
}

func MissingSeat(input *challenge.Challenge) int {
	ids := make([]int, 0)
	for line := range input.Lines() {
		pass := parsePass(line)
		ids = append(ids, pass.id)
	}
	sort.Ints(ids)
	lowest := ids[0]
	for i, id := range ids {
		if id != lowest+i {
			return id - 1
		}
	}
	panic("no solution")
}

func Register(s command.Solutions) {
	s.Register(5, "a", highestSeat)
	s.Register(5, "b", MissingSeat)
}
