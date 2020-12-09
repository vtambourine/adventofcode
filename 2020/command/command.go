package command

import "github.com/vtambourine/adventofcode/2020/challenge"

type SolutionFunc func(input *challenge.Challenge) int

type Solutions map[int]map[string]SolutionFunc

func (s Solutions) Register(day int, part string, solution SolutionFunc) {
	if _, ok := s[day]; !ok {
		s[day] = make(map[string]SolutionFunc)
	}
	s[day][part] = solution
}
